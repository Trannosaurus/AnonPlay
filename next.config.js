/** @type {import('next').NextConfig} */
    const nextConfig = {
        experimental: {
            appDir: true,
        },
        reactStrictMode: true,
        env: {
            PUSHER_APP_ID: process.env.PUSHER_APP_ID,
            PUSHER_KEY: process.env.PUSHER_KEY,
            PUSHER_SECRET: process.env.PUSHER_SECRET,
            PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
        },
    }
module.exports = nextConfig;
