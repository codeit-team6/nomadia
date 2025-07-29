import api from '@/shared/libs/api/axios';

export const getMyActivities = async ({ cursorId = null, size = 10 } = {}) => {
  const response = await api.get('/my-activities', {
    params: { cursorId, size },
  });
  return response.data;
};
