import { EmptyStarImage, StarImage } from '@/shared/components';
import { formatRating, shouldShowRating } from '@/shared/libs/utils/rating';

interface RatingDisplayProps {
  rating: number;
  reviewCount: number;
}

/**
 * 별점 표시 컴포넌트
 * @author 김영현
 * @param rating - 별점
 * @param reviewCount - 리뷰 개수
 * @returns 별점 표시 컴포넌트
 */
export const RatingDisplay = ({ rating, reviewCount }: RatingDisplayProps) => {
  return (
    <div className="flex items-center gap-[0.2rem]">
      {/* 별점 */}
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, idx) =>
          rating && idx < rating ? (
            <StarImage
              key={idx}
              extraClassName="size-[1.2rem] md:size-[1.6rem]"
            />
          ) : (
            <EmptyStarImage
              key={idx}
              extraClassName="size-[1.2rem] md:size-[1.6rem]"
            />
          ),
        )}
      </div>

      {/* Dot 구분자 */}
      <span className="text-[1rem] text-gray-400 md:text-[1.4rem]">•</span>

      {/* 별점 상세 점수 표기(소수점 한자리까지) */}
      {shouldShowRating(rating, reviewCount) && (
        <span className="text-[1.2rem] font-bold text-gray-800 md:text-[1.4rem]">
          {formatRating(rating)}
        </span>
      )}

      <span className="mr-[0.3rem]">
        <span className="text-[1.2rem] font-medium text-gray-600 md:text-[1.4rem]">
          ({reviewCount})
        </span>
      </span>
    </div>
  );
};
