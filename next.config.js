/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org', 'api.themoviedb.org'],
    unoptimized: true
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Для Vercel deployment
  output: 'standalone',
}

module.exports = nextConfig
