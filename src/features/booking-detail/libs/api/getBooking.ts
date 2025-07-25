import { GetBookingParams } from '@/features/booking-detail/libs/types/booking';
import api from '@/shared/libs/api/axios';

export const getBooking = async (params?: GetBookingParams) => {
  const { data } = await api.get(`/my-reservations`, { params });
  return data;
};
