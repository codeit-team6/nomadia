import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    // 이미지 최적화
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  experimental: {
    // 큰 패키지만 최적화
    optimizePackageImports: ['swiper', '@/shared/components'],
  },

  // webpack 번들 최적화
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // 프로덕션 빌드 최적화
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // 공통 컴포넌트들을 하나의 청크로 묶기
          shared: {
            test: /[\\/]src[\\/]shared[\\/]components[\\/]/,
            name: 'shared-components',
            chunks: 'all',
            priority: 10,
          },
          // vendor 청크 (node_modules)
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 5,
          },
        },
      };
    }
    return config;
  },

  // 압축 최적화
  compress: true,
};

export default nextConfig;
