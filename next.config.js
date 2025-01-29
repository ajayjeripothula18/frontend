/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
        has: [
          {
            type: 'query',
            key: 'auth',
            value: undefined // Only rewrite non-auth routes
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig; 