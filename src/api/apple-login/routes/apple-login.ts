export default {
  routes: [
    {
      method: 'POST',
      path: '/apple-login',
      handler: 'apple-login.login',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
