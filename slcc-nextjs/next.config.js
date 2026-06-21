/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment at jp169zx-gh.github.io/slcc
  basePath: process.env.NODE_ENV === 'production' ? '/slcc' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/slcc/' : '',
}

module.exports = nextConfig
