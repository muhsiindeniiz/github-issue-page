/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: { ssr: false },
  },
  images: {
    remotePatterns: [{ hostname: "github.com" }],
  },
  experimental: {
    webpackBuildWorker: true,
  },
};

export default nextConfig;