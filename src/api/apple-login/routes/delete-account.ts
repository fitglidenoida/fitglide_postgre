export default {
  routes: [
    {
      method: 'DELETE',
      path: '/delete-account',
      handler: 'delete-account.delete',
      config: {
        auth: {
          strategies: ['users-permissions'],
        },
        policies: [],
      },
    },
  ],
};
