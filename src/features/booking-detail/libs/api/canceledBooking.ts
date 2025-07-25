import api from '@/shared/libs/api/axios';

export const canceledBooking = async (reservationId: number) => {
  const { data } = await api.patch(`/my-reservations/${reservationId}`, {
    status: 'canceled',
  });
  return data;
};
