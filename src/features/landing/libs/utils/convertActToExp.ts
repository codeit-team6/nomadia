import type { Activity } from '@/features/activities/libs/types/activity';

import type { Experience } from '../types/types';

/**
 * 액티비티 데이터를 체험 데이터로 변환
 * @param activity - 액티비티 데이터
 * @returns 체험 데이터
 */
export const convertActivityToExperience = (
  activity: Activity,
): Experience => ({
  ...activity,
  image: activity.bannerImageUrl,
});
