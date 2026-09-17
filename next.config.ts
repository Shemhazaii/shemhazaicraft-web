import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  reactCompiler: true,
};

export default nextConfig;

module.exports = {
  output: 'standalone',
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '30901',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shemhazaicraft.my.id',
        pathname: '/storage/**',
      },
    ],
  },
}
