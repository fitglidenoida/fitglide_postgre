/**
 * A set of functions called "actions" for `delete-user`
 */

// src/api/delete-user/controllers/delete-user.ts
console.log('🔁 delete-user route loaded');

const deleteUser = async (ctx) => {
  try {
    const userId = ctx.state.user?.id;
    console.log('ctx.state.user', ctx.state.user);

	
    if (!userId) {
      return ctx.unauthorized('No authenticated user found');
    }

    const collections = [
      'apple-login', 'cheer', 'desi-message', 'diet-template', 'fitcoin-log',
      'health-log', 'mini-forum', 'step-session', 'weight-loss-story',
      'badge', 'coach', 'diet-component', 'dietician', 'forum',
      'health-vital', 'pack', 'strava-callback', 'workout',
      'blog', 'comment', 'diet-log', 'equipment', 'friend',
      'meal', 'post', 'thread', 'workout-log',
      'challenge', 'daily-quest', 'diet-plan', 'exercise',
      'google-login', 'meal-feedback', 'sleeplog'
    ];

    for (const collection of collections) {
      const uid = `api::${collection}.${collection}`;

      try {
        const result = await strapi.entityService.findMany(uid as any, {
          filters: { users_permissions_user: userId },
        });

        const items = Array.isArray(result) ? result : [result];

        for (const item of items) {
          if (item?.id) {
            await strapi.entityService.delete(uid as any, item.id);
          }
        }
      } catch (err) {
        strapi.log.warn(`⚠️ Could not clean ${collection}: ${err.message}`);
      }
    }

    // Don't delete the user here - let the iOS app handle it separately
    // await strapi.entityService.delete('plugin::users-permissions.user', userId);

    ctx.send({ message: '✅ User data cleaned up successfully. User account can now be deleted.' });
  } catch (error) {
    strapi.log.error('❌ Error during account deletion:', error);
    ctx.badRequest('Failed to delete user account', { error: error.message });
  }
};

export default { deleteUser };
