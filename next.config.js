/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_WEB3_STORAGE_TOKEN: process.env.NEXT_WEB3_STORAGE_TOKEN,
  },
};
const cacheRules = require("./cache");

const withPWA = require("@imbios/next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA(nextConfig);
