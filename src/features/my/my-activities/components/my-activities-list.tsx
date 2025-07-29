'use client';

import { useRef } from 'react';

import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';
import { useItemInfiniteQuery } from '@/shared/libs/hooks/infiniteScroll/useInfiniteQuery';
import { useInfiniteScroll } from '@/shared/libs/hooks/infiniteScroll/useInfiniteScroll';
import { Activity } from '@/shared/types/activity';

import MyActivitiesCard from '../components/my-activities-card';
import { getMyActivities } from '../lib/api/myActivities.api';

export const MyActivitiesList = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useItemInfiniteQuery({
      keyName: 'myActivities',
      getFn: getMyActivities,
      params: {
        size: 2,
      },
    });
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useInfiniteScroll(loadMoreRef, isLoading, hasNextPage, fetchNextPage, 50);

  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  if (!data) {
    return <div>아직 데이터 없음</div>;
  }

  const activities = data?.pages.flatMap((page) => page.activities);

  return (
    <div>
      {activities.map((activity: Activity) => (
        <MyActivitiesCard key={activity.id} activity={activity} />
      ))}
      <div ref={loadMoreRef}></div>
    </div>
  );
};
