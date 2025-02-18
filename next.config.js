/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable minification to prevent WebSocket issues
  swcMinify: true,
  experimental: {
    serverActions: {},
  },
  webpack: (config, { isServer, dev }) => {
    // Optimize WebSocket handling
    config.externals = [...(config.externals || []), { bufferutil: 'bufferutil', 'utf-8-validate': 'utf-8-validate' }];
    
    // Remove console logs in production
    if (!dev && !isServer) {
      const TerserPlugin = require("terser-webpack-plugin");
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // This will remove all console statements
            },
          },
        }),
      ];
    }

    return config;
  },
};

module.exports = nextConfig;
