import type { Strapi } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Strapi }) {
    strapi.server.router.use('/users/:id', async (ctx, next) => {
      if (ctx.method === 'PUT') {
        const { id } = ctx.params;
        const { data } = ctx.request.body;

        // Allow custom fields to be updated
        const sanitizedData = {
          firstName: data.firstName,
          lastName: data.lastName,
          mobile: data.mobile,
          // email: data.email // Optional, typically restricted
        };

        // Update user with sanitized data
        const updatedUser = await strapi.entityService.update(
          'plugin::users-permissions.user',
          id,
          { data: sanitizedData }
        );

        // Sanitize output (remove sensitive fields like password)
        const sanitizedUser = await strapi.service('plugin::users-permissions.user').sanitizeUser(updatedUser);

        ctx.body = sanitizedUser;
      } else {
        await next(); // Pass to next middleware if not PUT
      }
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Strapi }) {
    // Ensure Strava webhook subscription is created on startup
    await strapi.service('api::strava-callback.strava-callback').ensureWebhookSubscription();
  },
};