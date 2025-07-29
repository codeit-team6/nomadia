import api from '@/shared/libs/api/axios';
import {
  GetActListApiParams,
  GetActListApiResponse,
} from '@/shared/types/activity';
interface GetListWithCursorID extends GetActListApiParams {
  cursorId?: number;
}
export const getMyActivities = async (
  params?: GetListWithCursorID,
): Promise<GetActListApiResponse> => {
  const response = await api.get('/my-activities', {
    params,
  });
  return response.data;
};
