/** @type {import('next').NextConfig} */
const nextConfig = {
  // static photos never change in place — if a photo needs replacing, add it
  // under a new filename rather than overwriting, since browsers will cache
  // the old one for a year.
  images: {
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
