/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['lh3.googleusercontent.com']
  },
  async redirects() {
    return [
      {
        source: '/auth_callback/',
        destination: '/dashboard/',
        permanent: false,
      }
    ]
  },
}

module.exports = nextConfig
