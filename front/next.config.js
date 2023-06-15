/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.com.br",
      },
      {
        protocol: "https",
        hostname: "*.com",
      }
    ],
   /*  domains: ["s2.glbimg.com", "quatrorodas.abril.com.br", "cdn.motor1.com"], */
  },
};

module.exports = nextConfig;
