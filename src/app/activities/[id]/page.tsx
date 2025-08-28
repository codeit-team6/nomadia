import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import ActivityPage from '@/app/activities/[id]/page-content';
import { getActivityId } from '@/features/activityId/libs/api/getActivityId';

const Page = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['activityId', params.id],
    queryFn: () => getActivityId(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ActivityPage id={params.id} />
    </HydrationBoundary>
  );
};

export default Page;
