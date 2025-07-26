export default {
  routes: [
    {
      method: 'DELETE',
      path: '/delete-user',
      handler: 'delete-user.deleteUser',
      config: {
        auth:{
	scope: ['authenticated'],	
	},
        policies: [],
        middlewares: [],
      },
    },
  ],
};

