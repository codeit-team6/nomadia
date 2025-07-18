'use client';

import { useRef } from 'react';

import { getApi } from '@/app/(test)/test-scroll/getApi';
import { useItemInfiniteQuery } from '@/shared/libs/hooks/infiniteScroll/useInfiniteQuery';
import { useInfiniteScroll } from '@/shared/libs/hooks/infiniteScroll/useInfiniteScroll';
import { Button } from '@/shared/libs/shadcn/components/ui/button';

// 할일 : 페이지네이션: 5개 이하는  <,> 버튼 안보이게 해야겠다.

export default function Page() {
  // ✅ 무한스크롤 함수 호출
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useItemInfiniteQuery({
      keyName: 'activities',
      getFn: getApi,
      params: {
        sort: 'most_reviewed' as const, //as const를 붙이면 sort는 'most_reviewed' 리터럴 타입으로 유지(string타입으로 넘어가면 에러 터지니까 꼭 붙이기~)
        size: 6,
      },
    });
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // ✅
  useInfiniteScroll(loadMoreRef, isLoading, hasNextPage, fetchNextPage, 50);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생!</div>;

  const test = data?.pages.flatMap((page) => page.activities);
  // 페이지 단위로 캐싱했음. -> fltMap: 여러 페이지(pages) 각각에 들어있는 activities 배열을 하나의 단일 배열로 이어붙이는(평탄화하는) 작업

  return (
    <>
      <div className="flex flex-col gap-2">
        {test?.map((t) => (
          <div key={t.id} className="rounded-2xl bg-amber-200 p-10">
            <div className="txt-16-medium">{t.title}</div>
            <div className="txt-16-medium">{t.price}</div>
          </div>
        ))}
      </div>
      <Button
        className="txt-12-bold"
        onClick={() => {
          fetchNextPage();
          console.log('clicked');
        }}
      >
        get next items
      </Button>

      {/* ✅ Intersection Observer로 감시하고 있는 loadMoreRef 요소 */}
      <div ref={loadMoreRef} className="h-5 bg-transparent" />
    </>
  );
}
