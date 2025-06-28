/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '', // Leave blank unless needed
        pathname: '/**', // Match all paths
      },
    ],
  },
};

module.exports = nextConfig;  // Use CommonJS export
