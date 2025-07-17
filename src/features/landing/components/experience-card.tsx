import { Star } from 'lucide-react';
import Image from 'next/image';

import { formatPrice } from '@/shared/libs/utils/format-price';

import type { Experience } from '../libs/types/types';

/**
 * 체험 카드 UI 컴포넌트
 * @param experience - 체험 정보 객체
 */
const ExperienceCard = ({ experience }: { experience: Experience }) => (
  <div className="bg-background overflow-hidden rounded-[1.6rem] shadow-lg transition-transform duration-300 hover:scale-105">
    <div className="relative h-48">
      <Image
        src={experience.image}
        alt={experience.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        loading="lazy"
        priority={false}
      />
      <div className="bg-opacity-20 absolute inset-0"></div>
    </div>
    <div className="p-6 pb-6">
      <h3 className="mb-2 text-[1.4rem] font-bold text-gray-900 md:text-[1.8rem]">
        {experience.title}
      </h3>
      <div className="mb-3 flex items-center">
        <div className="flex items-center">
          <Star className="text-yellow h-[1.125rem] w-[1.125rem] md:h-[1.6rem] md:w-[1.6rem]" />
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

export default ExperienceCard;
