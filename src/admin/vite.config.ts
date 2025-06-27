import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      allowedHosts: ['admin.fitglide.in', 'localhost'],
      host: '0.0.0.0', // Allow external access
      port: 5173,      // Adjust as needed
    },
  });
};
