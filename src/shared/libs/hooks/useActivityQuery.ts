import { useInfiniteQuery } from '@tanstack/react-query';

import { getActListApi } from '@/features/activities/libs/api/getActListApi';
import {
  GetActListApiParams,
  GetActListApiResponse,
} from '@/shared/types/activity';

/**
 * 체험 목록 조회 훅
 * @author 김영현
 * @param params - 체험 목록 조회 파라미터
 * @returns 체험 목록 조회 결과
 * @description 랜딩페이지, 메인화면 배너, 인기 체험 컴포넌트에서 사용될 useActivity 훅
 */
const useActivity = (params: GetActListApiParams) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { page: _page, ...stableParams } = params;

  return useInfiniteQuery<GetActListApiResponse>({
    queryKey: ['activities', stableParams],
    queryFn: ({ pageParam = 1 }) =>
      getActListApi({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.activities.length < (params.size || 10)
        ? undefined
        : allPages.length + 1,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export default useActivity;
