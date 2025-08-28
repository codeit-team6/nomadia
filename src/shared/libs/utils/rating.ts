/**
 * 별점 관련 유틸리티 함수들
 * @author 김영현
 */

/**
 * 별점을 소수점 한자리까지 포맷팅
 * @param rating - 별점 (0-5)
 * @returns 포맷팅된 별점 문자열
 */
export const formatRating = (rating: number): string => {
  if (!rating || rating <= 0) return '0.0';
  return rating.toFixed(1);
};

/**
 * 별점 표시 여부 확인
 * @param rating - 별점
 * @param reviewCount - 리뷰 개수
 * @returns 별점을 표시할지 여부
 */
export const shouldShowRating = (
  rating: number,
  reviewCount: number,
): boolean => {
  return !!(rating && reviewCount && reviewCount > 0);
};
