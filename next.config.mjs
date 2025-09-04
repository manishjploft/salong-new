/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.duell.no', 'v5.checkprojectstatus.com', 'salongpartner.shoppin.no'], // Allow images from cdn.duell.no
      },
      reactStrictMode: false,
};

export default nextConfig;
