import { useReviewsQuery } from '@/features/activityId/libs/hooks/useReviewsQuery';
import { EmptyStarImage, StarImage } from '@/shared/components';
import { formatRatingToDecimal } from '@/shared/libs/utils/rating';

interface RatingDisplayProps {
  activityId: number;
  rating: number;
  reviewCount: number;
}

/**
 * 별점 표시 컴포넌트
 * @param activityId - 체험 ID
 * @param rating - fallback 별점
 * @param reviewCount - fallback 리뷰 개수
 */
export const RatingDisplay = ({
  activityId,
  rating,
  reviewCount,
}: RatingDisplayProps) => {
  const { data: reviewsData } = useReviewsQuery(activityId, {
    page: 1,
    size: 1,
  });

  // useReviewsQuery 데이터 우선, 없으면 fallback 데이터 사용
  const displayRating = reviewsData?.averageRating ?? rating;
  const displayReviewCount = reviewsData?.totalCount ?? reviewCount;

  return (
    <div className="flex items-center gap-[0.2rem]">
      {/* 별점 시각화 */}
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, idx) => {
          const clampedRating = Math.min(Math.max(displayRating, 0), 5);
          const filledStars = Math.floor(clampedRating);

          return idx < filledStars ? (
            <StarImage
              key={idx}
              extraClassName="size-[1.2rem] md:size-[1.6rem]"
            />
          ) : (
            <EmptyStarImage
              key={idx}
              extraClassName="size-[1.2rem] md:size-[1.6rem]"
            />
          );
        })}
      </div>

      {/* 구분자 */}
      <span className="text-[1rem] text-gray-400 md:text-[1.4rem]">•</span>

      {/* 별점 점수 */}
      <span className="text-[1.2rem] font-bold text-gray-800 md:text-[1.4rem]">
        {formatRatingToDecimal(displayRating)}
      </span>

      {/* 리뷰 개수 */}
      <span className="text-[1.2rem] font-medium text-gray-600 md:text-[1.4rem]">
        ({displayReviewCount})
      </span>
    </div>
  );
};
