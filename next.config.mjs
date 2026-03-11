import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'wallpapers.com',
      },
    ],
  },
  output: 'standalone',
};

export default withPWA({
  disable: isDev,
  dest: 'public',
  register: true,
  skipWaiting: true,
})(nextConfig);
