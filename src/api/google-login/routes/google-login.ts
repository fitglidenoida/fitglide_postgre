'use strict';

export default {
  routes: [
    {
      method: 'POST',
      path: '/google-login',
      handler: 'google-login.googleLogin',
      config: { auth: false },
    },
  ],
};
