export default {
    async beforeCreate(event: any) {
      const { data, params } = event;
      console.log(`[${new Date().toISOString()}] beforeCreate: Event data`, JSON.stringify(data, null, 2));
      if (data.user?.connect?.[0]?.id) {
        try {
          const user = await strapi.entityService.findOne('plugin::users-permissions.user', data.user.connect[0].id, {
            fields: ['firstName']
          });
          console.log(`[${new Date().toISOString()}] beforeCreate: Fetched user`, user);
          data.firstName = user?.firstName || 'Anonymous';
          console.log(`[${new Date().toISOString()}] beforeCreate: Set firstName to ${data.firstName}`);
        } catch (error: any) {
          console.error(`[${new Date().toISOString()}] beforeCreate: Error fetching user`, error.message);
          data.firstName = 'Anonymous';
        }
      } else {
        console.log(`[${new Date().toISOString()}] beforeCreate: No user relation found`);
        data.firstName = 'Anonymous';
      }
    },
  
    async beforeUpdate(event: any) {
      const { data, params } = event;
      console.log(`[${new Date().toISOString()}] beforeUpdate: Event data`, JSON.stringify(data, null, 2));
      if (data.user?.connect?.[0]?.id) {
        try {
          const user = await strapi.entityService.findOne('plugin::users-permissions.user', data.user.connect[0].id, {
            fields: ['firstName']
          });
          console.log(`[${new Date().toISOString()}] beforeUpdate: Fetched user`, user);
          data.firstName = user?.firstName || 'Anonymous';
          console.log(`[${new Date().toISOString()}] beforeUpdate: Set firstName to ${data.firstName}`);
        } catch (error: any) {
          console.error(`[${new Date().toISOString()}] beforeUpdate: Error fetching user`, error.message);
          data.firstName = 'Anonymous';
        }
      } else if (!data.firstName) {
        console.log(`[${new Date().toISOString()}] beforeUpdate: No user relation or firstName`);
        data.firstName = 'Anonymous';
      }
    }
  };