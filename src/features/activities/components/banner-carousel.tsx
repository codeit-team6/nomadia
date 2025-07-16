'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getActListApi } from '@/features/activities/libs/api/getActListApi';
import type { Activity } from '@/features/activities/libs/types/activity';

const BannerCarousel = () => {
  const [banners, setBanners] = useState<Activity[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getActListApi({
      sort: 'most_reviewed',
      page: 1,
      size: 8,
    }).then((res) => {
      setBanners(res.activities);
    });
  }, []);

  // 10초마다 자동 슬라이드
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [banners]);

  return (
    <div className="mx-auto mt-[3.2rem] w-full max-w-[112rem] px-[2.4rem] md:mt-[5rem] md:px-[3rem] lg:mt-[7rem] lg:px-[4rem]">
      <div className="relative mx-auto h-[18.1rem] w-full overflow-hidden rounded-2xl shadow-lg md:h-[37.5rem] lg:h-[50rem]">
        <div
          className="flex h-full w-full transition-transform duration-700"
          style={{
            width: `${banners.length * 100}%`,
            transform: `translateX(-${current * (100 / banners.length)}%)`,
          }}
        >
          {banners.map((banner, idx) => (
            <div
              key={banner.id}
              className="relative h-[18.1rem] w-full flex-shrink-0 md:h-[37.5rem] lg:h-[50rem]"
              style={{ width: `${100 / banners.length}%` }}
            >
              <Image
                src={banner.bannerImageUrl}
                alt={banner.title}
                fill
                className="object-cover"
                priority={idx === current}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 112rem"
              />
              <div
                className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-2 transition-opacity duration-700 md:p-8 lg:p-12 ${idx === current ? 'opacity-100' : 'opacity-60'}`}
              >
                <div className="leading- mb-2 text-center text-[1.8rem] font-bold text-white drop-shadow-lg md:text-[2.4rem] lg:text-[3.2rem]">
                  {banner.title || '제목 없음'}
                </div>
                <div className="pb-[2rem] text-center text-[1.4rem] font-bold text-white drop-shadow-lg md:pb-[4rem] md:text-[1.6rem] lg:text-[1.8rem]">
                  이달의 인기체험 BEST 🔥
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;
