import axios from 'axios';

import { MonthReservations } from '@/shared/components/calendar/libs/types/data';

interface FindReservationsByMonthParams {
  activityId: string;
  year: number;
  month: number;
}

interface FindReservationsByMonthResponse {
  data: MonthReservations[];
}

/**
 * 내 체험 월별 예약 현황 조회 API 호출 함수
 * @param params - activityId, year, month
 * @returns 월별 예약 현황 배열
 */
export const getReservationsByMonthApi = async ({
  activityId,
  year,
  month,
}: FindReservationsByMonthParams): Promise<MonthReservations[]> => {
  try {
    const response = await axios.get<FindReservationsByMonthResponse>(
      `https://sp-globalnomad-api.vercel.app/api/v1/my-activities/${activityId}/reservations/month`,
      {
        params: { year, month },
      },
    );

    return response.data.data;
  } catch (error) {
    console.error('내 체험 월별 예약 현황 조회 실패', error);
    throw error;
  }
};
