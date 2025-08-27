'use client';

import { useSearchParams } from 'next/navigation';

import AllActivities from '@/features/activities/components/all-activities';
import BannerCarousel from '@/features/activities/components/banner-carousel';
import BestActivities from '@/features/activities/components/best-activities';
import Search from '@/features/activities/components/search';
import SearchResults from '@/features/activities/components/search-result';

const ActivitiesPageContent = () => {
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword')?.trim() || '';
  const region = searchParams.get('region')?.trim() || '';
  const category = searchParams.get('category')?.trim() || '';

  const isSearching =
    keyword.length > 0 || region.length > 0 || category.length > 0;

  return (
    <main className="bg-background flex w-full flex-col gap-10">
      <div className="mx-auto w-full max-w-[120rem]">
        <BannerCarousel />
        <Search />

        {isSearching ? (
          <SearchResults />
        ) : (
          <>
            <BestActivities />
            <AllActivities />
          </>
        )}
      </div>
    </main>
  );
};

export default ActivitiesPageContent;
