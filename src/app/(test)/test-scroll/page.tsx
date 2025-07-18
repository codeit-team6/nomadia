'use client';
import useActivity from '@/shared/libs/hooks/useActivityQuery';

// export interface GetActListApiParams {
//   category?: string;
//   keyword?: string;
//   sort?: 'most_reviewed' | 'price_asc' | 'price_desc' | 'lastest';
//   page?: number;
//   size?: number;
// }

// 할일 : 페이지네이션: 5개 이하는  <,> 버튼 안보이게 해야겠다.

export default function Page() {
  const { data, isLoading, isError } = useActivity({
    sort: 'most_reviewed',
    page: 1,
    size: 8,
  });
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생!</div>;
  const test = data?.activities;
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
    </>
  );
}
