import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { formatPrice } from '@/shared/libs/utils/format-price';

import { Activity } from '../libs/types/activity';

interface ActivityCardProps {
  activity: Activity;
  className?: string;
}

/**
 * 액티비티 카드 컴포넌트
 * @author 김영현
 * @param activity - 액티비티 데이터
 * @param className - 추가 스타일 클래스
 */
export const ActivityCard = ({
  activity,
  className = '',
}: ActivityCardProps) => (
  // <Link
  //   href={`/activities/${activity.id}`}
  //   aria-label={`${activity.title} 상세 페이지로 이동`}
  // >
  <div
    className={`flex h-[24.3rem] w-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg ${className}`}
  >
    {/* 이미지 영역 */}
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
    {/* 콘텐츠 영역 */}
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
  // </Link>
);
