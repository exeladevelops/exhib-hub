/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Improve production performance
  swcMinify: true,

  // Image optimization configuration
  images: {
    domains: [
      'avatars.steamstatic.com',
      'steamcdn-a.akamaihd.net'
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Enable experimental features
  experimental: {
    // Enable server actions
    serverActions: true,
    // Enable optimistic updates
    optimisticClientCache: true,
  },

  // Configure headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ]
  },

  // Configure webpack for optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize CSS
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: 'styles',
          test: /\.(css|scss)$/,
          chunks: 'all',
          enforce: true,
        },
      };
    }

    return config;
  },
};

export default nextConfig; 