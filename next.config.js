/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // We ship local images in /public/media, so no remote configuration needed.
    // If you later reintroduce remote images, add `remotePatterns` here.
  },
};

module.exports = nextConfig;
