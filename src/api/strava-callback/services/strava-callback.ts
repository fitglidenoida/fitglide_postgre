import axios from 'axios';
import { tokenCache } from '../../../utils/cache'; // Add .ts extension

export default ({ strapi }) => ({
  async refreshAccessToken(user) {
    try {
      const { strava_refresh_token, athlete_id } = user;
      
      if (!strava_refresh_token) {
        strapi.log.error(`No refresh token found for user ${user.id}`);
        return null;
      }

      strapi.log.info(`Refreshing access token for athlete_id: ${athlete_id}`);
      
      const response = await axios.post('https://www.strava.com/oauth/token', {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: strava_refresh_token,
      });

      const { access_token, refresh_token, expires_at } = response.data;
      
      // Update user with new tokens in DB
      await strapi.db.query('plugin::users-permissions.user').update({
        where: { id: user.id },
        data: {
          strava_access_token: access_token,
          strava_refresh_token: refresh_token,
          strava_token_expires_at: expires_at,
        },
      });

      // Update cache as well
      tokenCache.set(athlete_id.toString(), {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: expires_at,
        timestamp: Date.now(),
      });

      strapi.log.info(`Token refreshed successfully for athlete_id: ${athlete_id}`);
      return access_token;
    } catch (error) {
      strapi.log.error(`Error refreshing token: ${error.message}`, error.stack);
      return null;
    }
  },

  async handleNewActivity(activityId, athleteId) {
    try {
      strapi.log.info(`Starting handleNewActivity for activityId: ${activityId}, athleteId: ${athleteId}`);

      // Find the user associated with this athlete ID
      strapi.log.info('Querying user by athlete_id:', athleteId);
      const users = await strapi.entityService.findMany('plugin::users-permissions.user', {
        filters: { athlete_id: athleteId },
      });
      strapi.log.info('Found users:', JSON.stringify(users));

      if (!users || users.length === 0) {
        strapi.log.warn(`No user found for athlete ID: ${athleteId}`);
        return;
      }

      const user = users[0];
      const userId = user.id;
      strapi.log.info(`Found user with ID: ${userId}`);

      // Get token from DB (fallback to cache)
      let accessToken = user.strava_access_token;
      let expiresAt = user.strava_token_expires_at;
      
      // If not in DB, try cache
      if (!accessToken) {
        const tokenData = tokenCache.get(athleteId.toString());
        if (tokenData) {
          accessToken = tokenData.accessToken;
          expiresAt = tokenData.expiresAt;
          strapi.log.info(`Retrieved tokens from cache for athlete_id: ${athleteId}`);
        } else {
          strapi.log.error(`No tokens found in DB or cache for athlete_id: ${athleteId}`);
          return;
        }
      } else {
        strapi.log.info(`Retrieved tokens from DB for athlete_id: ${athleteId}`);
      }

      // Check if the token has expired (5-minute buffer) and refresh if needed
      const currentTime = Math.floor(Date.now() / 1000);
      if (expiresAt < currentTime + 300) {
        strapi.log.info(`Access token expired for athlete ${athleteId} at ${expiresAt}, current time: ${currentTime}. Refreshing...`);
        accessToken = await this.refreshAccessToken(user);
        
        if (!accessToken) {
          strapi.log.error(`Failed to refresh token for athlete ${athleteId}`);
          return;
        }
      }

      // Fetch the detailed activity from Strava with retry on 401
      strapi.log.info(`Fetching detailed activity from Strava for activityId: ${activityId}`);
      let response;
      try {
        response = await axios.get(`https://www.strava.com/api/v3/activities/${activityId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } catch (error) {
        // If 401, try refreshing token and retry once
        if (error.response?.status === 401) {
          strapi.log.info(`Received 401, refreshing token and retrying for athlete ${athleteId}`);
          accessToken = await this.refreshAccessToken(user);
          
          if (!accessToken) {
            strapi.log.error(`Failed to refresh token after 401 for athlete ${athleteId}`);
            return;
          }
          
          // Retry with new token
          response = await axios.get(`https://www.strava.com/api/v3/activities/${activityId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        } else {
          throw error;
        }
      }
      
      strapi.log.info('Activity fetch response:', JSON.stringify(response.data));

      const detailedActivity = response.data;

      // Deduplicate by checking if the activity already exists in workout-logs
      const logId = `strava_${activityId}`;
      strapi.log.info(`Checking for existing workout log with logId: ${logId}`);
      const existingLogs = await strapi.entityService.findMany('api::workout-log.workout-log', {
        filters: { logId: logId },
      });
      strapi.log.info('Existing logs:', JSON.stringify(existingLogs));

      if (existingLogs.length > 0) {
        strapi.log.info(`Activity with ID ${logId} already exists, skipping`);
        return;
      }

      // Handle missing coordinates
      const startLatLng = detailedActivity.start_latlng?.length === 2 ? detailedActivity.start_latlng : [0.0, 0.0];
      const endLatLng = detailedActivity.end_latlng?.length === 2 ? detailedActivity.end_latlng : [0.0, 0.0];
      strapi.log.info(`Coordinates - startLatLng: ${startLatLng}, endLatLng: ${endLatLng}`);

      // Map route coordinates
      const route = [
        { lat: startLatLng[0], lng: startLatLng[1] },
        { lat: endLatLng[0], lng: endLatLng[1] },
      ];

      // Calculate end time from start_date (UTC) + elapsed_time
      const startDate = new Date(detailedActivity.start_date);
      const endDate = new Date(startDate.getTime() + (detailedActivity.elapsed_time * 1000));
      const endTime = endDate.toISOString();
      
      strapi.log.info(`Time calculation - start: ${detailedActivity.start_date}, elapsed: ${detailedActivity.elapsed_time}s, end: ${endTime}`);
      
      // Map to WorkoutLog with all required fields (matching schema field names)
      const workoutLog = {
        logId: logId,
        workout: null,
        startTime: detailedActivity.start_date,
        endTime: endTime,
        Distance: detailedActivity.distance / 1000, // Convert meters to kilometers (PascalCase for Strapi)
        TotalTime: detailedActivity.moving_time / 3600, // Convert seconds to hours (PascalCase for Strapi)
        Calories: detailedActivity.calories || 0, // PascalCase for Strapi
        HeartRateAverage: Math.round(detailedActivity.average_heartrate || 0), // PascalCase for Strapi
        HeartRateMaximum: Math.round(detailedActivity.max_heartrate || 0), // PascalCase for Strapi
        HeartRateMinimum: 0, // PascalCase for Strapi
        route: route,
        completed: true,
        notes: `Synced from Strava: ${detailedActivity.name}`,
        users_permissions_user: userId,
        moving_time: detailedActivity.moving_time / 3600, // Also save as decimal hours
        strava_activity_id: activityId,
        athlete_id: athleteId,
        source: 'strava',
      };
      strapi.log.info('Workout log to be created:', JSON.stringify(workoutLog));

      // Save the workout log
      strapi.log.info('Creating workout log in database');
      try {
        const result = await strapi.entityService.create('api::workout-log.workout-log', { data: workoutLog });
        strapi.log.info(`Saved workout log for activity: ${activityId}, documentId: ${result.documentId}`);
      } catch (createError) {
        strapi.log.error(`Database create error for activity ${activityId}`);
        strapi.log.error(`Error code: ${createError.code}`);
        strapi.log.error(`Error detail: ${createError.detail}`);
        strapi.log.error(`Error constraint: ${createError.constraint}`);
        strapi.log.error(`Error column: ${createError.column}`);
        strapi.log.error(`Error table: ${createError.table}`);
        strapi.log.error(`Full error: ${JSON.stringify(createError)}`);
        
        throw createError;
      }
    } catch (error) {
      strapi.log.error(`Error syncing activity ${activityId}:`, error.message);
      strapi.log.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      if (error.response) {
        strapi.log.error('External API error response:', JSON.stringify(error.response.data));
      }
      if (error.stack) {
        strapi.log.error('Error stack:', error.stack);
      }
      throw error;
    }
  },

  async ensureWebhookSubscription() {
    try {
      strapi.log.info('Starting Strava webhook subscription setup');
      const clientId = process.env.STRAVA_CLIENT_ID;
      const clientSecret = process.env.STRAVA_CLIENT_SECRET;
      const callbackUrl = 'https://admin.fitglide.in/api/strava-callback/webhook';
      const verifyToken = 'STRAVA';

      if (!clientId || !clientSecret) {
        strapi.log.error('Strava client ID or secret not configured');
        return;
      }
      strapi.log.info('Strava client ID and secret found');

      // Check for existing subscriptions
      strapi.log.info('Checking for existing Strava webhook subscriptions');
      const existingSubscriptions = await axios.get('https://www.strava.com/api/v3/push_subscriptions', {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
        },
      });

      const subscriptions = existingSubscriptions.data;
      if (subscriptions.length > 0) {
        strapi.log.info('Webhook subscription already exists:', JSON.stringify(subscriptions[0]));
        return; // Skip creation since subscription already exists
      }

      strapi.log.info('No existing subscriptions found, creating a new one');

      strapi.log.info('Creating webhook subscription with:', JSON.stringify({
        client_id: clientId,
        callback_url: callbackUrl,
        verify_token: verifyToken,
      }));

      const response = await axios.post(
        'https://www.strava.com/api/v3/push_subscriptions',
        {
          client_id: clientId,
          client_secret: clientSecret,
          callback_url: callbackUrl,
          verify_token: verifyToken,
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );

      strapi.log.info('Webhook subscription created:', JSON.stringify(response.data));
    } catch (error) {
      strapi.log.error('Error creating webhook subscription:', error.message, error.stack);
      if (error.response) {
        strapi.log.error('Strava response status:', error.response.status.toString());
        strapi.log.error('Strava response data:', JSON.stringify(error.response.data));
        strapi.log.error('Strava response headers:', JSON.stringify(error.response.headers));
      } else if (error.request) {
        strapi.log.error('No response received from Strava:', error.request.toString());
      } else {
        strapi.log.error('Error setting up request:', error.message);
      }
    }
  },
});