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
    const userService = strapi.service('plugin::users-permissions.user');

    userService.update = async (id: string, data: any) => {
      try {
        const sanitizedData = {
          firstName: data.firstName,
          lastName: data.lastName,
          mobile: data.mobile,
        };

        const updatedUser = await strapi.entityService.update(
          'plugin::users-permissions.user',
          id,
          { data: sanitizedData }
        );

        return updatedUser;
      } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('User update failed');
      }
    };
  },
};
