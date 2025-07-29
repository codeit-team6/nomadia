'use client';

import { useQuery } from '@tanstack/react-query';

import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';
import { Activity } from '@/shared/types/activity';

import MyActivitiesCard from '../components/my-activities-card';
import { getMyActivities } from '../lib/api/myActivities.api';

export const MyActivitiesList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['myActivities'],
    queryFn: () => getMyActivities({}),
  });

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
  return (
    <div>
      {data.activities.map((activity: Activity) => (
        <MyActivitiesCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};
