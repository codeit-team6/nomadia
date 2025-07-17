'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import useActivity from '@/shared/libs/hooks/useActivityQuery';

import { steps } from '../libs/constants/data';
import Cta from './cta';
import ExperienceCard from './experience-card';
import Hero from './hero';

const LandingPage = () => {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);

  const { data, isLoading, isError } = useActivity({
    sort: 'most_reviewed',
    page: 1,
    size: 8,
  });

  // 로딩/에러 처리 -> 추후 로딩 관련 스피너 추가 필요 , 에러 상태 관련 컴포넌트 추가 필요
  if (isLoading) {
    return <div className="py-12 text-center text-gray-400">로딩 중...</div>;
  }
  if (isError) {
    return (
      <div className="py-12 text-center text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  const activities = data?.activities ?? [];

  return (
    <div className="bg-background min-h-screen">
      <Hero
        activities={activities}
        swiperRef={swiperRef}
        ExperienceCard={ExperienceCard}
        router={router}
      />
      <Cta steps={steps} router={router} />
    </div>
  );
};

export default LandingPage;
