export default {
  routes: [
    {
      method: 'POST',
      path: '/strava-callback',
      handler: 'strava-callback.handleCallback',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/strava-auth',
      handler: 'strava-callback.initiate',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/strava-callback/webhook',
      handler: 'strava-callback.webhook',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/strava-callback/webhook',
      handler: 'strava-callback.webhook',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};