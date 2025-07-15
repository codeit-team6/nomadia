import { Award, Calendar, Search } from 'lucide-react';

import type { StepCardProps } from './types';
import { Experience } from './types';

/**
 * 랜딩 페이지에서 사용되는 체험(Experience) 데이터 배열
 */
export const experiences: Experience[] = [
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

/**
 * 랜딩 페이지 3단계 안내에 사용되는 StepCard 데이터 배열
 * - 각 단계별 아이콘, 제목, 설명을 포함
 */
export const steps: StepCardProps[] = [
  {
    icon: <Search className="text-main h-8 w-8 md:h-10 md:w-10" />,
    step: 'STEP 1',
    title: '관심 체험 찾기',
    description: (
      <>
        <span>내 취향과 위치에 맞는</span>
        <br />
        체험을 찾아보세요
      </>
    ),
  },
  {
    icon: <Calendar className="text-main h-8 w-8 md:h-10 md:w-10" />,
    step: 'STEP 2',
    title: '간편 예약 하기',
    description: (
      <>
        <span>원하는 날짜와 시간을</span>
        <br />
        선택하고 바로 예약
      </>
    ),
  },
  {
    icon: <Award className="text-main h-8 w-8 md:h-10 md:w-10" />,
    step: 'STEP 3',
    title: '체험 & 리뷰',
    description: (
      <>
        <span>새로운 경험을 즐기고</span>
        <br />
        다른 사람들과 공유
      </>
    ),
  },
];
