export default {
  async delete(ctx: any) {
    try {
      const userId = ctx.state.user?.id;

      if (!userId) {
        return ctx.unauthorized("User not authenticated");
      }

      // Delete related content (diet, sleep, vitals, etc.)
      const deleteFrom = [
        'api::healthvital.healthvital',
        'api::diet-plan.diet-plan',
        'api::meal.meal',
        'api::workout-log.workout-log',
        'api::sleep-log.sleep-log',
        'api::step-session.step-session',
        'api::fitcoin-log.fitcoin-log',
        'api::badge.badge',
        'api::post.post',
        'api::comment.comment',
        'api::challenge.challenge',
        'api::pack.pack'
      ];

      for (const model of deleteFrom) {
        await strapi.db.query(model).deleteMany({
          where: {
            users_permissions_user: userId,
          },
        });
      }

      // Delete the user itself
      await strapi.db.query('plugin::users-permissions.user').delete({
        where: { id: userId },
      });

      return ctx.send({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error("Delete account error:", error);
      return ctx.internalServerError("Account deletion failed");
    }
  },
};
