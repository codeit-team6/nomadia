import { useQuery } from '@tanstack/react-query';

import { getReviews } from '@/features/activityId/libs/api/getReviews';

export const useReviewsQuery = (
  id: number,
  params: { page: number; size: number },
  options?: {
    enabled?: boolean;
    fetchLatest?: boolean;
  },
) => {
  const { enabled = true, fetchLatest = false } = options || {};

  return useQuery({
    queryKey: ['reviews', id, fetchLatest],
    queryFn: () => getReviews(id, params),
    staleTime: 1000 * 60 * 30,
    retry: 1,
    enabled: enabled && fetchLatest,
  });
};
