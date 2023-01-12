/** @type {import('next').NextConfig} */
    const nextConfig = {
        experimental: {
            appDir: true,
        },
        reactStrictMode: true,
        env: {
            APPID: process.env.appId,
            KEY: process.env.key,
            SECRET: process.env.secret,
            CLUSTER: process.env.cluster,
        },
    }
module.exports = nextConfig;
