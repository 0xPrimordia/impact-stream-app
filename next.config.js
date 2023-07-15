/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_WEB3_STORAGE_TOKEN: process.env.NEXT_WEB3_STORAGE_TOKEN
    }
};
module.exports = nextConfig;
