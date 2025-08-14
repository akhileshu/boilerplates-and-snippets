import type { NextConfig } from "next";

const devConfig: NextConfig = {
  reactStrictMode: false,
  compress: false,
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  onDemandEntries: {
    maxInactiveAge: 1000 * 60, // 1 min before rebuild
    pagesBufferLength: 2,
  },
  webpack(config) {
    config.devtool = "cheap-module-source-map";
    return config;
  },
};

const prodConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    formats: ["image/avif", "image/webp"],
  },
  webpack(config) {
    return config;
  },
};

const nextConfig =
  process.env.NODE_ENV === "development" ? devConfig : prodConfig;

  // ANALYZE=true npm run build
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
export default withBundleAnalyzer(nextConfig);
