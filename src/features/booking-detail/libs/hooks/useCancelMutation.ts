import { useMutation } from '@tanstack/react-query';

import { canceledBooking } from '@/features/booking-detail/libs/api/canceledBooking';

export const useCancelMutation = () => {
  return useMutation({
    mutationFn: canceledBooking,
    onSuccess: () => {
      // 예약 취소 성공 시 페이지 새로고침
      window.location.reload();
    },
    onError: (error) => {
      console.error('예약 취소 실패:', error);
      // 에러 시에는 새로고침하지 않고 에러 메시지만 표시
    },
  });
};
