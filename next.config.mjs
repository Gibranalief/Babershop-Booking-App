// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "images.images-imgur.com",
      },
      {
        protocol: "https",
        hostname: "**.postimg.cc", // Jika menggunakan Postimages
      },
      {
        protocol: "https",
        hostname: "**.imgbb.com", // Jika menggunakan ImgBB
      },
    ],
  },
};

export default nextConfig;
