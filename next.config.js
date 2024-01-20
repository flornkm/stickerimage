/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "*.googleapis.com",
      },
    ],
  },
}

module.exports = nextConfig
