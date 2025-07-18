import path from 'path';

export default ({ env }) => {
  return {
    connection: {
      client: env('DATABASE_CLIENT', 'postgres'),
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'fitglide_db'),
        user: env('DATABASE_USERNAME', 'fitglide_dbadmin'),
        password: env('DATABASE_PASSWORD', 'S@ndysango1982'),
        ssl: env.bool('DATABASE_SSL', false),
        timezone: 'Asia/Kolkata', // or '+05:30'

      },
      pool: { min: 2, max: 10 },
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
