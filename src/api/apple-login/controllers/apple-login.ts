import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

export default {
  async login(ctx: any) {
    const { id_token, firstName, lastName } = ctx.request.body as { 
      id_token: string;
      firstName?: string;
      lastName?: string;
    };

    if (!id_token) {
      console.log('No id_token provided in request');
      return ctx.badRequest('No id_token provided');
    }

    try {
      console.log('Validating Apple id_token');
      const decodedToken = await validateAppleToken(id_token);
      const { email, sub: appleUserId } = decodedToken;
      console.log(`Decoded token: email=${email}, appleUserId=${appleUserId}`);

      if (!email) {
        throw new Error('No email in decoded token');
      }

      // Find user in Strapi v5
      console.log(`Querying user with email: ${email}`);
      let strapiUser = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { email },
      });

      if (!strapiUser) {
        console.log(`Creating new user with email: ${email}`);
        // Use provided firstName/lastName or try to extract from token
        const { given_name: tokenFirstName, family_name: tokenLastName } = decodedToken;
        const finalFirstName = firstName || tokenFirstName;
        const finalLastName = lastName || tokenLastName;
        
        console.log(`Creating user with firstName=${finalFirstName}, lastName=${finalLastName}`);

        strapiUser = await strapi.entityService.create('plugin::users-permissions.user', {
          data: {
            email,
            username: email.split('@')[0],
            provider: 'apple',
            password: Math.random().toString(36).slice(-8),
            confirmed: true,
            blocked: false,
            appleId: appleUserId,
            firstName: finalFirstName,
            lastName: finalLastName,
            role: 1,
          },
        });

        console.log(`User created: ${strapiUser.email}`);
      } else {
        console.log(`User logged in: ${strapiUser.email}`);
        // Update existing user's name if provided and different
        if ((firstName && firstName !== strapiUser.firstName) || 
            (lastName && lastName !== strapiUser.lastName)) {
          console.log(`Updating user profile with firstName=${firstName}, lastName=${lastName}`);
          strapiUser = await strapi.entityService.update('plugin::users-permissions.user', strapiUser.id, {
            data: {
              firstName: firstName || strapiUser.firstName,
              lastName: lastName || strapiUser.lastName,
            },
          });
        }
      }

      // Generate JWT
      console.log(`Generating JWT for user ID: ${strapiUser.id}`);
      const jwtToken = strapi
        .plugin('users-permissions')
        .service('jwt')
        .issue({ id: strapiUser.id });

      const sanitizedUser = {
        id: strapiUser.id,
        email: strapiUser.email,
        firstName: strapiUser.firstName || null,
        lastName: strapiUser.lastName || null,
      };

      return ctx.send({
        message: 'Login successful',
        jwt: jwtToken,
        user: sanitizedUser,
      });
    } catch (error) {
      console.error('Apple login error:', error);
      return ctx.badRequest('Invalid id_token', { error: (error as Error).message });
    }
  },
};

async function validateAppleToken(idToken: string): Promise<any> {
  console.log('Fetching Apple public keys');
  const client = jwksClient({
    jwksUri: 'https://appleid.apple.com/auth/keys',
  });

  try {
    const decodedHeader = jwt.decode(idToken, { complete: true }) as { header: { kid: string } };
    console.log('Decoded header:', decodedHeader);
    const kid = decodedHeader.header.kid;

    const key = await client.getSigningKey(kid);
    const publicKey = key.getPublicKey();
    console.log('Public key fetched');

    const verified = jwt.verify(idToken, publicKey, {
      algorithms: ['RS256'],
      issuer: 'https://appleid.apple.com',
      audience: 'com.TrailBlazeWellness.Fitglide-ios',
    });
    console.log('Token verified:', verified);
    return verified;
  } catch (error) {
    console.error('Token validation error:', error);
    throw error;
  }
}
