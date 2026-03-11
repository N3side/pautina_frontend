import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

    allowedDevOrigins: ["*", "0.0.0.0", 'pautina.local', '*.pautina.local', 'localhost', '10.255.255.254'],

    turbopack: {},

    reactStrictMode: false,
    output: 'standalone',

    trailingSlash: false,

    images: {
        minimumCacheTTL: 60,
        unoptimized: true
    },

}

export default nextConfig
