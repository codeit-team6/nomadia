import { useEffect } from 'react';

import { AvailableScheduleList } from '@/features/activityId/libs/types/availableSchedule';
import { formatDateToYMD } from '@/shared/components/calendar/libs/utils/formatDateToYMD';

// 지난 날짜의 일정을 걸러냄
export const useFilterPastSchedule = (
  data: AvailableScheduleList | undefined,
  setScheduledDate: React.Dispatch<React.SetStateAction<AvailableScheduleList>>,
) => {
  useEffect(() => {
    if (!data) return;
    const today = formatDateToYMD(new Date());
    const notYetPassed = data?.filter((schedule) => schedule.date >= today);
    setScheduledDate(notYetPassed);
  }, [data, setScheduledDate]);
};
