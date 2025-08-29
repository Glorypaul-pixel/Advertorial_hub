/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://connect.advertorialhub.net/api/:path*", // backend URL
      },
    ];
  },
};

export default nextConfig;
