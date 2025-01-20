const bundleAnalyzer = require('@next/bundle-analyzer');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add any other Next.js config options you need
}

<<<<<<< HEAD
module.exports = withBundleAnalyzer(nextConfig);
=======
module.exports = withBundleAnalyzer(nextConfig);
>>>>>>> 6e45bbe71281a9c3acad20ba7c0a6fa57e6e4e7a
