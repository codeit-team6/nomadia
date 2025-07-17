'use client';

import 'swiper/css';
import 'swiper/css/navigation';

import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useActivity from '@/shared/libs/hooks/useActivityQuery';
import { formatPrice } from '@/shared/libs/utils/format-price';

const BestActivities = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const { data, isLoading, isError } = useActivity({
    sort: 'most_reviewed',
    page: 1,
    size: 8,
  });

  // 로딩 상태 처리 -> 추후 로딩 관련 스피너 추가 필요
  if (isLoading) {
    return <div className="py-12 text-center text-gray-400">로딩 중...</div>;
  }

  // 에러 상태 처리 -> 추후 에러 상태 관련 컴포넌트 추가 필요
  if (isError) {
    return (
      <div className="py-12 text-center text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  const activities = data?.activities ?? [];

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="px-[2.4rem] md:px-[3rem] lg:px-[4rem]">
      <div className="mb-[4rem] flex items-center justify-between md:mb-[1.6rem] lg:mb-[2rem]">
        <p className="flex items-center gap-2 text-[1.8rem] font-bold text-gray-950 md:text-[3.2rem]">
          <span role="img" aria-label="fire">
            🔥
          </span>{' '}
          인기 체험
        </p>
        <div className="flex gap-2">
          <button
            onClick={handlePrevSlide}
            className="hover:bg-sub-300 border-sub rounded-full border-1 bg-white p-2 transition-colors"
            aria-label="이전"
          >
            <ChevronLeft className="text-main h-[1.8rem] w-[1.8rem] md:h-[2.8rem] md:w-[2.8rem]" />
          </button>
          <button
            onClick={handleNextSlide}
            className="hover:bg-sub-300 border-sub rounded-full border-1 bg-white p-2 transition-colors"
            aria-label="다음"
          >
            <ChevronRight className="text-main h-[1.8rem] w-[1.8rem] md:h-[2.8rem] md:w-[2.8rem]" />
          </button>
        </div>
      </div>

      {/* Swiper 캐러셀 */}
      <div>
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={18} // gap-[1.8rem] = 18px
          slidesPerView={2} // 모바일에서 2개씩 표시
          slidesPerGroup={2} // 2개씩 그룹으로 슬라이드
          loop={true}
          speed={500}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            768: {
              slidesPerView: 2, // 태블릿 2개
              slidesPerGroup: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4, // 데스크톱 4개
              slidesPerGroup: 2,
              spaceBetween: 30,
            },
          }}
          className="best-activities-swiper"
        >
          {activities.map((activity) => (
            <SwiperSlide key={activity.id}>
              <div className="mb-[2.4rem] flex h-[24.3rem] w-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg md:mb-[8rem]">
                {/* 이미지 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={activity.bannerImageUrl}
                    alt={activity.title}
                    fill
                    className="rounded-t-3xl object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority={false}
                  />
                </div>
                {/* 콘텐츠 */}
                <div className="flex flex-1 flex-col justify-between p-[1.25rem]">
                  {/* 제목 */}
                  <h3 className="mb-2 line-clamp-2 text-[1.4rem] leading-[1.8rem] font-semibold text-gray-900">
                    {activity.title}
                  </h3>
                  {/* 별점과 리뷰 */}
                  <div className="mb-2 flex items-center gap-1">
                    <Star className="text-yellow h-[1.125rem] w-[1.125rem] md:h-[2rem] md:w-[2rem]" />
                    <span className="text-[1.2rem] font-medium text-gray-950 md:text-[1.4rem]">
                      {activity.rating}
                    </span>
                    <span className="text-[1.2rem] font-medium text-gray-400 md:text-[1.4rem]">
                      ({activity.reviewCount})
                    </span>
                  </div>
                  {/* 가격 */}
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-[1.5rem] leading-[1.8rem] font-bold text-gray-950">
                      ₩ {formatPrice(activity.price)}
                    </span>
                    <span className="text-[1.2rem] font-semibold text-gray-400 md:text-[1.6rem]">
                      /인
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BestActivities;
