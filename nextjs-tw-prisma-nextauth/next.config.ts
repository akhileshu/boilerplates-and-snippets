import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(self), microphone=()",
          },
        ],
      },
    ];
  },
  pageExtensions: ["mdx", "ts", "js", "tsx"],
  /* config options here */
  images: {
    remotePatterns: [
      {
        // hostname: "lh3.googleusercontent.com",
        hostname: "*",
      },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
