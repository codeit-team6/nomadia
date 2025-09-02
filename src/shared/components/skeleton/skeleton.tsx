export const BannerSkeleton = () => {
  return (
    <div className="relative h-[18.1rem] animate-pulse overflow-hidden rounded-[1.2rem] bg-gray-200 md:h-[37.5rem] md:rounded-[1.8rem] lg:h-[50rem] lg:rounded-[2.4rem]">
      {/* 배경 이미지 영역 */}
      <div className="h-full w-full bg-gray-300"></div>

      {/* 그라데이션 오버레이와 텍스트 영역 */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-2 md:p-8 lg:p-12">
        {/* 제목 skeleton */}
        <div className="mb-2 flex justify-center">
          <div className="h-[1.8rem] w-2/3 rounded bg-gray-400 md:h-[2.4rem] lg:h-[3.2rem]"></div>
        </div>

        {/* 이달의 인기체험 BEST 🔥 skeleton */}
        <div className="mt-[1rem] flex justify-center pb-[2rem] md:pb-[4rem]">
          <div className="h-[1.4rem] w-1/3 rounded bg-gray-400 md:h-[1.6rem] lg:h-[1.8rem]"></div>
        </div>
      </div>
    </div>
  );
};

export const ActivityCardSkeleton = () => {
  return (
    <div className="mb-[2.4rem] flex h-[24.3rem] w-full animate-pulse flex-col overflow-hidden rounded-[0.8rem] bg-white md:mb-[8rem] md:h-[42.3rem] md:rounded-[1.8rem] lg:h-[36.6rem]">
      {/* 이미지 영역 - 실제 ActivityCard와 동일한 비율 */}
      <div className="relative aspect-[3/4] w-full overflow-hidden md:-mb-[2.6rem] md:aspect-11/10 lg:aspect-[3/4]">
        <div className="h-full w-full rounded-t-[0.8rem] bg-gray-300 md:rounded-t-[1.8rem]"></div>
      </div>

      {/* 콘텐츠 영역 - 실제 ActivityCard와 동일한 구조 */}
      <div className="flex flex-1 flex-col rounded-[0.8rem] px-[1.7rem] py-[1.2rem] md:z-10 md:rounded-t-[1.8rem] md:bg-white md:px-[3rem] md:py-[2rem] lg:px-[2.8rem] lg:py-[2.4rem]">
        {/* 제목 영역 */}
        <div className="mt-[0.5rem] flex flex-col gap-[0.6rem]">
          <div className="h-[1.4rem] w-3/4 rounded bg-gray-300 md:h-[1.6rem]"></div>
          <div className="mt-[0.3rem] flex min-h-[1.8rem] items-center justify-between">
            <div className="h-[1.4rem] w-16 rounded bg-gray-300 md:h-[1.6rem] md:w-20"></div>
          </div>
        </div>

        {/* 가격 영역 */}
        <div className="mt-[1rem]">
          <div className="h-[1.5rem] w-20 rounded bg-gray-300 md:h-[1.8rem] md:w-24"></div>
        </div>
      </div>
    </div>
  );
};
