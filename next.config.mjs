import withPWA from 'next-pwa';

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
  dest: 'public',
})(nextConfig);
