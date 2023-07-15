/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        WEB3_STORAGE_TOKEN: process.env.WEB3_STORAGE_TOKEN
    }
};
module.exports = nextConfig;
