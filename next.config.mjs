import withPWA from 'next-pwa';

const nextConfig = {
  // 기존 nextConfig 설정
  images: {
    domains: ['s3.ap-northeast-2.amazonaws.com','wallpapers.com'],
  },
};

export default withPWA({
  dest: 'public',
})(nextConfig);
