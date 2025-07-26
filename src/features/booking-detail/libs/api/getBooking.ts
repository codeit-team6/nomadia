import { GetBookingParams } from '@/features/booking-detail/libs/types/booking';
import api from '@/shared/libs/api/axios';

/**
 * 예약 목록 조회 API
 * @author 김영현
 * @param params - 예약 목록 조회 파라미터
 * @returns 예약 목록
 */
export const getBooking = async (params?: GetBookingParams) => {
  const { data } = await api.get(`/my-reservations`, { params });
  return data;
};
