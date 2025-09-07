/**
 * 별점을 소수점 한자리까지 포맷팅합니다.
 * @param rating 별점 (0-5, undefined/null 허용)
 * @returns 포맷팅된 별점 문자열
 */
export const formatRatingToDecimal = (
  rating: number | undefined | null,
): string => {
  if (rating == null || Number.isNaN(rating)) return '0.0';

  const clampedRating = Math.min(Math.max(rating, 0), 5);
  return clampedRating <= 0 ? '0.0' : clampedRating.toFixed(1);
};

/**
 * 별점 표시 여부를 확인합니다.
 * @param rating 별점
 * @param reviewCount 리뷰 개수
 * @returns 별점을 표시할지 여부
 */
export const shouldShowRating = (
  rating: number,
  reviewCount: number,
): boolean => {
  return !!(rating && reviewCount && reviewCount > 0);
};
