import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "localhost",
      "127.0.0.1", 
      "192.168.1.100",
      "lh3.googleusercontent.com"
    ],
  },
};

export default nextConfig;
