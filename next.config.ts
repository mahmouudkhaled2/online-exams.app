import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },

      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },

      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },

      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },

      {
        protocol: 'https',
        hostname: 'exam.elevateegy.com',  
      },
    ],
  },
};

export default nextConfig;
