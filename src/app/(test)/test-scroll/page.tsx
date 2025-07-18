'use client';

import { getApi } from '@/shared/libs/hooks/infiniteScroll/getApi';
import { useItemInfiniteQuery } from '@/shared/libs/hooks/infiniteScroll/useInfiniteQuery';
import { Button } from '@/shared/libs/shadcn/components/ui/button';

// 할일 : 페이지네이션: 5개 이하는  <,> 버튼 안보이게 해야겠다.

export default function Page() {
  const params: {
    sort: 'most_reviewed';
    size: number;
  } = {
    sort: 'most_reviewed',
    size: 5,
  };
  const { data, fetchNextPage } = useItemInfiniteQuery({
    key: 'activities',
    fn: getApi,
    params: params,
  });
  //   if (isLoading) return <div>로딩 중...</div>;
  //   if (isError) return <div>에러 발생!</div>;
  //   const test = data?.activities;

  const test = data?.pages.flatMap((page) => page.activities);
  console.log(test);

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
    </>
  );
}
