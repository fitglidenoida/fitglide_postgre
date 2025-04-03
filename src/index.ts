// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {
    strapi.service('plugin::users-permissions.user').update = async (id: string, data: any) => {
      const sanitizedData = {
        firstName: data.firstName,
        lastName: data.lastName,
        mobile: data.mobile,
        email: data.email // Allow email update if needed
      };
      const updatedUser = await strapi.entityService.update('plugin::users-permissions.user', id, {
        data: sanitizedData
      });
      return updatedUser;
    };
  },
};
