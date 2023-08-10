/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_WEB3_STORAGE_TOKEN: process.env.NEXT_WEB3_STORAGE_TOKEN,
  },
};
const cacheRules = require("./cache");

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: "https://auth.privy.io/api/v1/sessions",
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "privy-session",
          expiration: {
            maxEntries: 1,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
    ],
  },
});

module.exports = withPWA(nextConfig);
