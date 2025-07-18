//
// export interface GetActListApiParams {
//   category?: string;
//   keyword?: string;
//   sort?: 'most_reviewed' | 'price_asc' | 'price_desc' | 'lastest';
//   page?: number;
//   size?: number;
// }

import { useInfiniteQuery } from '@tanstack/react-query';
//   const { data, isLoading, isError } = useActivity({
//     sort: 'most_reviewed',
//     page: 1,
//     size: 8,
//   });

type WithCursorId = { cursorId?: number }; // 응답에 반드시 포함될 값

export function useItemInfiniteQuery<
  P extends object, // 요청 params: P는 함수가 받는 요청 파라미터 객체의 타입
  R extends WithCursorId, // 응답 타입은 cursorId 포함: R은 함수가 반환하는 응답 객체 타입
>({
  key,
  fn,
  params,
}: {
  key: string;
  fn: (params: P & { cursorId?: number }) => Promise<R>;
  params: P;
}) {
  return useInfiniteQuery<R, Error>({
    queryKey: [key, params],
    // queryFn: ({}) => fn(params),
    queryFn: ({ pageParam }) =>
      fn({ ...params, cursorId: pageParam as number | undefined }),

    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    initialPageParam: undefined, //첫 번째 페이지를 로딩할 때 넘겨주는 pageParam(필수)
  });
}
