import axios from 'axios';
import { tokenCache } from '../../../utils/cache'; // Add .ts extension

export default ({ strapi }) => ({
  async initiate(ctx) {
    try {
      const clientId = process.env.STRAVA_CLIENT_ID;
      const redirectUri = 'https://fitglide.in/callback';
      const scope = 'activity:write,activity:read_all';
      const state = ctx.query.state || ctx.request.body.state || '';

      strapi.log.info(`Received state from query: ${ctx.query.state}, from body: ${ctx.request.body.state}, final state: ${state}`);

      if (!clientId) {
        strapi.log.error('STRAVA_CLIENT_ID not configured');
        ctx.status = 500;
        ctx.body = { error: 'STRAVA_CLIENT_ID not configured' };
        return;
      }
      if (!redirectUri) {
        strapi.log.error('STRAVA_REDIRECT_URI not configured');
        ctx.status = 500;
        ctx.body = { error: 'STRAVA_REDIRECT_URI not configured' };
        return;
      }

      const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&state=${state}&approval_prompt=force`;
      strapi.log.info(`Generated Strava auth URL: ${authUrl}`);
      return { redirectUrl: authUrl };
    } catch (error) {
      strapi.log.error('Error generating Strava auth URL:', error.message, error.stack);
      ctx.status = 500;
      ctx.body = { error: `Failed to generate Strava auth URL: ${error.message}` };
      return;
    }
  },

  async handleCallback(ctx) {
    const { code, state } = ctx.request.body;

    if (!code || !state) {
      ctx.status = 400;
      ctx.body = { error: 'Code and state are required' };
      return;
    }

    try {
      const [userId, randomState] = state.split(':');
      if (!userId || !randomState) {
        ctx.status = 400;
        ctx.body = { error: 'Invalid state parameter format' };
        return;
      }

      const response = await axios.post('https://www.strava.com/oauth/token', {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
      });

      const { access_token, refresh_token, expires_at, athlete } = response.data;
      strapi.log.info(`Token exchange successful: access_token=${access_token}, expires_at=${expires_at}, athlete_id=${athlete.id}`);

      // Store tokens in the in-memory cache with TTL
      tokenCache.set(athlete.id.toString(), {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: expires_at,
        timestamp: Date.now(),
      });
      strapi.log.info(`Stored tokens in cache for athlete_id: ${athlete.id}`);

      // Update the user's profile in Strapi with athlete ID, connection status, AND tokens in DB
      const updatedUser = await strapi.db.query('plugin::users-permissions.user').update({
        where: { id: userId },
        data: {
          athlete_id: athlete.id,
          strava_connected: true,
          strava_access_token: access_token,
          strava_refresh_token: refresh_token,
          strava_token_expires_at: expires_at,
        },
      });
      strapi.log.info(`Updated user with ID ${userId}: athlete_id=${athlete.id}, tokens saved to DB`);

      ctx.status = 200;
      ctx.body = {
        status: 'success',
        access_token: access_token,
        refresh_token: refresh_token,
        expires_at: expires_at,
        athlete_id: athlete.id,
      };
    } catch (error) {
      strapi.log.error('Error exchanging Strava code:', error.message, error.stack);
      ctx.status = 500;
      ctx.body = { error: 'Failed to exchange Strava code', details: error.message };
      return;
    }
  },

  async webhook(ctx) {
    try {
      strapi.log.info('Webhook endpoint called with query:', JSON.stringify(ctx.query));

      if (ctx.request.method === 'GET') {
        const { 'hub.mode': mode, 'hub.verify_token': token, 'hub.challenge': challenge } = ctx.query;

        strapi.log.info(`Parsed query parameters - mode: ${mode}, token: ${token}, challenge: ${challenge}`);

        const VERIFY_TOKEN = 'STRAVA';

        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
          strapi.log.info('Webhook subscription validated');
          return { "hub.challenge": challenge };
        } else {
          strapi.log.error('Webhook validation failed: Invalid token or mode');
          strapi.log.error(`Validation details - Expected mode: subscribe, received: ${mode}; Expected token: STRAVA, received: ${token}`);
          ctx.status = 403;
          ctx.body = { error: 'Invalid token or mode' };
          return;
        }
      } else if (ctx.request.method === 'POST') {
        const event = ctx.request.body;
        strapi.log.info('Received Strava webhook event:', JSON.stringify(event));

        if (event.object_type === 'activity') {
          if (event.aspect_type === 'create') {
            const activityId = event.object_id;
            const athleteId = event.owner_id;
            strapi.log.info(`New activity created: ID=${activityId}, Athlete=${athleteId}`);

            await strapi.service('api::strava-callback.strava-callback').handleNewActivity(activityId, athleteId);
          } else if (event.aspect_type === 'delete') {
            const activityId = event.object_id;
            strapi.log.info(`Activity deleted: ID=${activityId}`);
            await strapi.db.query('api::workout-log.workout-log').delete({ 
              where: { logId: `strava_${activityId}` },
            });
          } else if (event.aspect_type === 'update') {
            const activityId = event.object_id;
            const athleteId = event.owner_id;
            strapi.log.info(`Activity updated: ID=${activityId}, Athlete=${athleteId}`);
            await strapi.service('api::strava-callback.strava-callback').handleNewActivity(activityId, athleteId);
          }
        } else if (event.object_type === 'athlete' && event.updates?.authorized === 'false') {
          const athleteId = event.object_id;
          strapi.log.info(`Athlete revoked access: ID=${athleteId}`);
          await strapi.db.query('plugin::users-permissions.user').update({
            where: { athlete_id: athleteId },
            data: {
              strava_connected: false,
              athlete_id: null,
            },
          });
          tokenCache.delete(athleteId.toString());
          strapi.log.info(`Removed tokens from cache for athlete_id: ${athleteId}`);
        }

        ctx.status = 200;
      } else {
        strapi.log.error('Invalid request method for webhook');
        ctx.status = 405;
        ctx.body = { error: 'Method not allowed' };
      }
    } catch (error) {
      strapi.log.error('Error handling Strava webhook:', error.message, error.stack);
      ctx.status = 400; // Change to 400 to indicate a client-side issue (missing tokens)
      ctx.body = { error: 'Failed to process webhook event', details: error.message };
    }
  },
});