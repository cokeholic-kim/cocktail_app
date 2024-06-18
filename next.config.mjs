import withPWA from 'next-pwa';

const nextConfig = {
  // 기존 nextConfig 설정
};

export default withPWA({
  dest: 'public',
})(nextConfig);
