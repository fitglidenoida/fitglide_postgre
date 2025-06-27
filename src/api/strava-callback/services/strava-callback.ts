import axios from 'axios';
import { tokenCache } from '../../../utils/cache'; // Add .ts extension

export default ({ strapi }) => ({
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

      // Retrieve tokens from the in-memory cache
      const tokenData = tokenCache.get(athleteId.toString());
      if (!tokenData) {
        strapi.log.error(`No tokens found in cache for athlete_id: ${athleteId}`);
        return; // Gracefully return instead of throwing an error
      }
      strapi.log.info(`Retrieved tokens from cache for athlete_id: ${athleteId}`);

      const accessToken = tokenData.accessToken;
      const expiresAt = tokenData.expiresAt;

      // Check if the token has expired (5-minute buffer)
      if (expiresAt < Math.floor(Date.now() / 1000) + 300) {
        strapi.log.error(`Access token expired for athlete ${athleteId} at ${expiresAt}, current time: ${Math.floor(Date.now() / 1000)}`);
        return; // Gracefully return instead of throwing an error
      }

      // Fetch the detailed activity from Strava
      strapi.log.info(`Fetching detailed activity from Strava for activityId: ${activityId}`);
      const response = await axios.get(`https://www.strava.com/api/v3/activities/${activityId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
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

      // Map to WorkoutLog
      const workoutLog = {
        logId: logId,
        workout: null,
        startTime: detailedActivity.start_date,
        endTime: detailedActivity.start_date_local,
        distance: detailedActivity.distance / 1000, // Convert meters to kilometers
        totalTime: detailedActivity.moving_time / 3600, // Convert seconds to hours
        calories: detailedActivity.calories || 0,
        heartRateAverage: detailedActivity.average_heartrate || 0,
        heartRateMaximum: detailedActivity.max_heartrate || 0,
        heartRateMinimum: 0,
        route: route,
        completed: true,
        notes: `Synced from Strava: ${detailedActivity.name}`,
        users_permissions_user: userId,
      };
      strapi.log.info('Workout log to be created:', JSON.stringify(workoutLog));

      // Save the workout log
      strapi.log.info('Creating workout log in database');
      await strapi.entityService.create('api::workout-log.workout-log', { data: workoutLog });
      strapi.log.info(`Saved workout log for activity: ${activityId}`);
    } catch (error) {
      strapi.log.error(`Error syncing activity ${activityId}:`, error.message, error.stack);
      if (error.response) {
        strapi.log.error('External API error response:', JSON.stringify(error.response.data));
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