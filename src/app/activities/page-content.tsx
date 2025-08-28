'use client';

import { useSearchParams } from 'next/navigation';
import { lazy, Suspense } from 'react';

// 즉시 로드 (LCP 최우선)
import BannerCarousel from '@/features/activities/components/banner-carousel';
import Search from '@/features/activities/components/search';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';

// 지연 로드 (성능 최적화)
const BestActivities = lazy(
  () => import('@/features/activities/components/best-activities'),
);
const AllActivities = lazy(
  () => import('@/features/activities/components/all-activities'),
);
const SearchResults = lazy(
  () => import('@/features/activities/components/search-result'),
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
          <Suspense fallback={<LoadingSpinner />}>
            <SearchResults keyword={keyword} />
          </Suspense>
        ) : (
          <>
            {/* 지연 로드: 인기 체험 */}
            <Suspense fallback={<LoadingSpinner />}>
              <BestActivities />
            </Suspense>

            {/* 지연 로드: 전체 체험 목록 */}
            <Suspense fallback={<LoadingSpinner />}>
              <AllActivities />
            </Suspense>
          </>
        )}
      </div>
    </main>
  );
};

export default ActivitiesPageContent;
