import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

    allowedDevOrigins: ["*", "0.0.0.0", 'pautina.test', '*.pautina.test', 'localhost', '10.255.255.254', "pautina.top", "*.pautina.top"],

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
