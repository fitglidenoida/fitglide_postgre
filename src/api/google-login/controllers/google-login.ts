'use strict';

const axios = require('axios');

module.exports = {
  async googleLogin(ctx) {
    const { id_token } = ctx.request.body;
    if (!id_token) return ctx.badRequest('No ID token provided');

    try {
      // Verify token with Google
      const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`);
      const googleData = response.data;
      if (!googleData.email) throw new Error('Invalid Google token');

      // Check if user exists in Strapi
      const existingUser = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { email: googleData.email },
      });

      let user;
      if (existingUser) {
        // User exists—log them in
        user = existingUser;
        console.log(`User logged in: ${user.email}`);
      } else {
        // Create new user
        user = await strapi.plugins['users-permissions'].services.user.add({
          username: googleData.email.split('@')[0],
          email: googleData.email,
          provider: 'google',
          password: Math.random().toString(36).slice(-8),
          confirmed: true,
          role: 1,
        });
        console.log(`User created: ${user.email}`);
      }

      // Generate JWT
      const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
        id: user.id,
      });

      ctx.body = {
        message: 'Login successful',
        jwt,
        user: { id: user.id, email: user.email },
      };
    } catch (error) {
      console.error('Google login error:', error.message);
      return ctx.badRequest('Invalid Google token or server error');
    }
  },
};
