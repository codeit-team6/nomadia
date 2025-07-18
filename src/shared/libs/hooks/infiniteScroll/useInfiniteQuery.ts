import { useInfiniteQuery } from '@tanstack/react-query';

type WithCursorId = { cursorId?: number }; // 응답에 반드시 포함될 값

export function useItemInfiniteQuery<
  P extends object, // 요청 params: P는 함수가 받는 요청 파라미터 객체의 타입
  R extends WithCursorId, // 응답 타입은 cursorId 포함: R은 함수가 반환하는 응답 객체 타입
>({
  keyName,
  getFn,
  params,
}: {
  keyName: string;
  getFn: (params: P & { cursorId?: number }) => Promise<R>;
  params: P;
}) {
  return useInfiniteQuery<R, Error>({
    queryKey: [keyName, params],
    queryFn: ({ pageParam }) =>
      getFn({ ...params, cursorId: pageParam as number | undefined }), //pageParam은 useInfiniteQuery 내부에서 자동으로 넘겨주는 값이며,이를 cursorId로 전달하여 다음 페이지 데이터를 요청함
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined, //다음 페이지 호출을 위한 cursorID 값 확보(pageParam값 설정)
    initialPageParam: undefined, //최초 요청 시 넘겨줄 pageParam 값. undefined면 첫 페이지로 간주
  });
}
