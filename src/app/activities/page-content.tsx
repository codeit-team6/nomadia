'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

// 즉시 로드 (LCP 최우선)
import BannerCarousel from '@/features/activities/components/banner-carousel';
import Search from '@/features/activities/components/search';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';

// 지연 로드 (성능 최적화) - Next.js dynamic 사용
const BestActivities = dynamic(
  () => import('@/features/activities/components/best-activities'),
  {
    loading: () => <LoadingSpinner />,
    ssr: true, // SSR 활성화로 초기 로딩 성능 향상
  },
);

const AllActivities = dynamic(
  () => import('@/features/activities/components/all-activities'),
  {
    loading: () => <LoadingSpinner />,
    ssr: true,
  },
);

const SearchResults = dynamic(
  () => import('@/features/activities/components/search-result'),
  {
    loading: () => <LoadingSpinner />,
    ssr: true,
  },
);

const ActivitiesPageContent = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('search')?.trim() || '';
  const isSearching = keyword.trim().length > 0;

  return (
    <main className="bg-background flex w-full flex-col gap-10">
      <div className="mx-auto w-full max-w-[120rem]">
        {/* 즉시 로드: LCP 최우선 */}
        <BannerCarousel />
        <Search />

        {isSearching ? (
          <SearchResults keyword={keyword} />
        ) : (
          <>
            {/* 지연 로드: 인기 체험 */}
            <BestActivities />

            {/* 지연 로드: 전체 체험 목록 */}
            <AllActivities />
          </>
        )}
      </div>
    </main>
  );
};

export default ActivitiesPageContent;
