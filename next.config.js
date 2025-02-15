/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable minification to prevent WebSocket issues
  swcMinify: false,
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    // Optimize WebSocket handling
    config.externals = [...(config.externals || []), { bufferutil: 'bufferutil', 'utf-8-validate': 'utf-8-validate' }];
    return config;
  }
};

module.exports = nextConfig;