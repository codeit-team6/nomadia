import { useQuery } from '@tanstack/react-query';

import { getBooking } from '@/features/booking-detail/libs/api/getBooking';
import {
  GetBookingParams,
  GetBookingResponse,
} from '@/features/booking-detail/libs/types/booking';

export const useBookingQuery = (params?: GetBookingParams) => {
  return useQuery<GetBookingResponse>({
    queryKey: ['booking', params],
    queryFn: () => getBooking(params),
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });
};
