'use client';

import {
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { formatPrice } from '@/shared/utils/format-price';

interface Experience {
  id: number;
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  image: string;
}

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const experiences: Experience[] = [
    {
      id: 1,
      title: '피오르 체험',
      rating: 3.9,
      reviewCount: 108,
      price: 42800,
      image: '/images/experiences/exp_1.png',
    },
    {
      id: 2,
      title: '해안 여행',
      rating: 2.9,
      reviewCount: 67,
      price: 80000,
      image: '/images/experiences/exp_2.png',
    },
    {
      id: 3,
      title: '갈대숲 체험',
      rating: 4.0,
      reviewCount: 113,
      price: 32000,
      image: '/images/experiences/exp_3.png',
    },
    {
      id: 4,
      title: '자전거 여행',
      rating: 3.9,
      reviewCount: 108,
      price: 42800,
      image: '/images/experiences/exp_4.png',
    },
    {
      id: 5,
      title: '열대어 체험',
      rating: 4.3,
      reviewCount: 18,
      price: 12000,
      image: '/images/experiences/exp_5.png',
    },
    {
      id: 6,
      title: '석양 힐링 체험',
      rating: 4.2,
      reviewCount: 78,
      price: 9500,
      image: '/images/experiences/exp_6.png',
    },
    {
      id: 7,
      title: '숲 힐링 체험',
      rating: 4.1,
      reviewCount: 111,
      price: 18000,
      image: '/images/experiences/exp_7.png',
    },
    {
      id: 8,
      title: '열기구 체험',
      rating: 4.1,
      reviewCount: 85,
      price: 35000,
      image: '/images/experiences/exp_8.png',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (experiences.length - 2));
    }, 4000);
    return () => clearInterval(timer);
  }, [experiences.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (experiences.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + experiences.length - 2) % (experiences.length - 2),
    );
  };

  // 체험 카드 컴포넌트
  const ExperienceCard = ({ experience }: { experience: Experience }) => (
    <div className="bg-background overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        {/* 체험 썸네일 이미지 - 배경에 꽉 차게 렌더링 */}
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
          priority={false}
        />
        {/* 어두운 오버레이로 텍스트 가독성 향상 */}
        <div className="bg-opacity-20 absolute inset-0"></div>
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-[1.4rem] font-bold text-gray-900 md:text-[1.8rem]">
          {experience.title}
        </h3>
        <div className="mb-3 flex items-center">
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-[1.4rem] font-bold md:text-[1.6rem]">
              {experience.rating}
            </span>
            <span className="ml-1 text-[1.2rem] md:text-[1.4rem]">
              ({experience.reviewCount})
            </span>
          </div>
        </div>
        <div className="text-[1.4rem] font-bold text-gray-900 md:text-[1.8rem]">
          ₩ {formatPrice(experience.price)}
          <span className="text-[1.2rem] md:text-[1.4rem]">/인</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background min-h-screen">
      {/* 히어로 섹션 */}
      <div className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16">
          {/* 메인 컨텐츠 */}
          <div className="mb-16 text-center">
            {/* <h1 className="mb-6 text-[2.4rem] font-bold text-gray-950 md:text-[3.2rem]">
              새로운 취미, 특별한 체험을 한 곳에서
            </h1> */}
            <h1 className="mb-6 text-[2.4rem] leading-tight font-black tracking-tight md:text-[4rem]">
              <span className="bg-gradient-to-r from-[oklch(0.682_0.153_248.5)] via-[oklch(0.6_0.18_260)] to-[oklch(0.72_0.14_235)] bg-clip-text text-transparent">
                새로운 취미, 특별한 체험을
              </span>
              <br />
              <span className="text-gray-900">한 곳에서</span>
            </h1>

            {/* <p className="mb-12 text-[1.8rem] text-gray-900 md:text-[2.4rem]">
              체험을 찾는 사람도, 만드는 사람도 될 수 있는 플랫폼
            </p> */}
            <div className="relative mb-12">
              <p className="text-[1.6rem] leading-relaxed font-medium text-gray-700 md:text-[2.2rem]">
                체험을
                <span className="mx-2 rounded-full bg-[oklch(0.957_0.022_243.9)] px-3 py-1 font-bold text-[oklch(0.682_0.153_248.5)]">
                  찾는 사람도
                </span>
                <br className="md:hidden" />
                <span className="mx-2 rounded-full bg-[oklch(0.957_0.022_243.9)] px-3 py-1 font-bold text-[oklch(0.682_0.153_248.5)]">
                  만드는 사람도
                </span>
                될 수 있는 플랫폼
              </p>
            </div>

            <div className="mb-16 flex justify-center space-x-4">
              <button className="bg-main rounded-full px-8 py-3 text-[1.6rem] text-white transition-colors hover:opacity-90 md:text-[2rem]">
                체험 찾기
              </button>
              <button className="bg-sub text-main rounded-full px-8 py-3 text-[1.6rem] transition-colors hover:opacity-80 md:text-[2rem]">
                호스트 되기
              </button>
            </div>
          </div>

          {/* 체험 카드 캐러셀 */}
          <div className="relative">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[2rem] font-bold text-gray-900 md:text-[2.4rem]">
                인기 체험
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={prevSlide}
                  className="bg-sub rounded-full p-2 transition-colors hover:bg-gray-200"
                >
                  <ChevronLeft className="h-5 w-5 md:h-7 md:w-7" />
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-sub rounded-full p-2 transition-colors hover:bg-gray-200"
                >
                  <ChevronRight className="h-5 w-5 md:h-7 md:w-7" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
              >
                {experiences.map((experience) => (
                  <div key={experience.id} className="w-1/3 flex-shrink-0 px-2">
                    <ExperienceCard experience={experience} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-20">
        <div className="mx-auto w-full px-4 text-center">
          {/* <h2 className="mb-6 text-[2.8rem] font-bold text-gray-900 md:text-[3.2rem]">
            어떻게 시작하나요?
          </h2>

          <p className="text-main mb-16 text-[1.6rem] md:text-[1.8rem]">
            간단한 3단계로 새로운 경험을 시작하세요
          </p> */}
          <div className="relative mb-16">
            <h2 className="mb-4 text-[2.8rem] leading-tight font-black md:text-[4rem]">
              <span className="bg-gradient-to-r from-[oklch(0.682_0.153_248.5)] to-[oklch(0.72_0.14_235)] bg-clip-text text-transparent">
                어떻게
              </span>
              <span className="text-gray-900"> 시작하나요?</span>
            </h2>

            {/* 강조된 서브타이틀 */}
            <div className="inline-block">
              <p className="rounded-2xl bg-[oklch(0.957_0.022_243.9)] px-6 py-3 text-[1.6rem] font-semibold text-[oklch(0.682_0.153_248.5)] shadow-md md:text-[2rem]">
                간단한 3단계로 새로운 경험을 시작하세요
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="mb-16 flex w-full flex-col gap-4 sm:flex-row sm:flex-nowrap sm:gap-4">
            <div className="flex min-w-0 flex-1 basis-0 flex-col items-center">
              <div className="bg-sub mb-4 flex h-16 w-16 items-center justify-center rounded-2xl md:h-20 md:w-20">
                <Search className="text-main h-8 w-8 md:h-10 md:w-10" />
              </div>
              <div className="text-main mb-2 text-[1.6rem] font-bold md:text-[2rem]">
                STEP 1
              </div>
              <h3 className="mb-3 text-[2rem] font-bold md:text-[2.4rem]">
                관심 체험 찾기
              </h3>
              <p className="text-[1.6rem] leading-[1.8] text-gray-700 md:text-[1.8rem]">
                내 취향과 위치에 맞는
                <br />
                체험을 찾아보세요
              </p>
            </div>

            <div className="flex min-w-0 flex-1 basis-0 flex-col items-center">
              <div className="bg-sub mb-4 flex h-16 w-16 items-center justify-center rounded-2xl md:h-20 md:w-20">
                <Calendar className="text-main h-8 w-8 md:h-10 md:w-10" />
              </div>
              <div className="text-main mb-2 text-[1.6rem] font-bold md:text-[2rem]">
                STEP 2
              </div>
              <h3 className="mb-3 text-[2rem] font-bold md:text-[2.4rem]">
                간편 예약 하기
              </h3>
              <p className="text-[1.6rem] leading-[1.8] text-gray-700 md:text-[1.8rem]">
                원하는 날짜와 시간을
                <br />
                선택하고 바로 예약
              </p>
            </div>

            <div className="flex min-w-0 flex-1 basis-0 flex-col items-center">
              <div className="bg-sub mb-4 flex h-16 w-16 items-center justify-center rounded-2xl md:h-20 md:w-20">
                <Award className="text-main h-8 w-8 md:h-10 md:w-10" />
              </div>
              <div className="text-main mb-2 text-[1.6rem] font-bold md:text-[2rem]">
                STEP 3
              </div>
              <h3 className="mb-3 text-[2rem] font-bold md:text-[2.4rem]">
                체험 & 리뷰
              </h3>
              <p className="text-[1.6rem] leading-[1.8] text-gray-700 md:text-[1.8rem]">
                새로운 경험을 즐기고
                <br />
                다른 사람들과 공유
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-main rounded-full px-12 py-4 text-[1.8rem] text-white transition-colors hover:opacity-90">
            시작 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
