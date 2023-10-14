/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui","database","tailwind-config"]
}

module.exports = nextConfig
