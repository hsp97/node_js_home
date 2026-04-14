/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // /api/market/* → NestJS localhost:4000/market/*
        source: "/api/:path*",
        destination: "http://localhost:4000/:path*",
        //destination: "https://phs.it.kr/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
