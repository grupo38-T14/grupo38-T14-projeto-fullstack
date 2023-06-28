/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.com.br",
      },
      {
        protocol: "http",
        hostname: "*.com.br",
      },
      {
        protocol: "https",
        hostname: "*.com",
      },
    ],
  },
};

module.exports = nextConfig;
