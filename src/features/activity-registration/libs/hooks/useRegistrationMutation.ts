import { useMutation, useQueryClient } from '@tanstack/react-query';

import { registrationApi } from '@/features/activity-registration/libs/api/registrationApi';
import { ActivityRegistrationParams } from '@/shared/types/activity';

export const useRegistrationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ActivityRegistrationParams) => registrationApi(params),
    onSuccess: () => {
      // 성공 시 관련 쿼리들을 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['my-activities'] });
    },
    onError: (error) => {
      // 에러 처리 (필요에 따라 toast나 alert 표시)
      console.error('체험 등록 실패:', error);
    },
  });
};
