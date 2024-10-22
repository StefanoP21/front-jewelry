/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ["images.pexels.com", "media.istockphoto.com"],
  },
};

export default nextConfig;
