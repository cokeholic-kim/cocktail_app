import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';
const apiOrigin = process.env.NEXT_PUBLIC_API_URL || '';
const apiHost = (() => {
    try {
        return new URL(apiOrigin).origin;
    } catch {
        return '';
    }
})();

const connectSrc = ['self'];
if (apiHost) {
    connectSrc.push(apiHost);
}

const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value:
            `default-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; ` +
            `img-src 'self' data: https://s3.ap-northeast-2.amazonaws.com https://wallpapers.com; ` +
            `script-src 'self' 'unsafe-inline'; ` +
            `connect-src ${connectSrc.join(' ')}; ` +
            "style-src 'self' 'unsafe-inline'; " +
            "font-src 'self';",
    },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
];

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
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders,
            },
        ];
    },
};

export default withPWA({
    disable: isDev,
    dest: 'public',
    register: true,
    skipWaiting: true,
})(nextConfig);
