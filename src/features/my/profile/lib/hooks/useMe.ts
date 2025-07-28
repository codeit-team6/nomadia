import { useQuery } from '@tanstack/react-query';

import { getMe } from '@/features/my/profile/lib/api/profile.api';

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: 0,
  });
};
