import api from '@/shared/libs/api/axios';

interface PostReviewParams {
  reservationId: number;
  rating: number;
  content: string;
}

/**
 * 예약 상세 페이지에서 리뷰 작성 API (체험 완료된 카드)
 * @author 김영현
 * @param params - 리뷰 작성 파라미터
 * @returns 리뷰 작성 결과
 */
export const postReview = async (params: PostReviewParams) => {
  const { data } = await api.post(
    `/my-reservations/${params.reservationId}/reviews`,
    {
      rating: params.rating,
      content: params.content,
    },
  );
  return data;
};
