import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

    allowedDevOrigins: ['pautina.local', 'localhost', '10.255.255.254'],

    turbopack: {},

    reactStrictMode: false,
    output: 'standalone',

    trailingSlash: false
}

export default nextConfig
