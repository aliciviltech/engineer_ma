/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'lh3.googleusercontent.com',
          },
          {
            hostname: 'openweathermap.org',
          }
        ],
      },
};

export default nextConfig;
