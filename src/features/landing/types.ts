import { ReactNode } from 'react';

/**
 * 체험(Experience) 정보를 나타내는 인터페이스
 * - 체험 카드, 리스트 등에서 사용
 */
export interface Experience {
  id: number;
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  image: string;
}

/**
 * StepCard 컴포넌트에 전달되는 props 타입
 * - 랜딩 페이지 3단계 안내 카드 등에서 사용
 */
export interface StepCardProps {
  icon: ReactNode;
  step: string;
  title: string;
  description: ReactNode;
}
