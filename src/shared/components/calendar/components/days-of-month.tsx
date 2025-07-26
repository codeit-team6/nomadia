import { ReactNode } from 'react';

import DayOfWeek from '@/shared/components/calendar/components/dayOfWeek';
import NotThisMonth from '@/shared/components/calendar/components/not-this-month';
import { getMonthRange } from '@/shared/components/calendar/libs/utils/getMonthRange';
import { cn } from '@/shared/libs/cn';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

interface CalendarProps {
  inactiveCellStyle?: string;
  calendarWidth?: string;
  dayOfWeekStyle?: string;
  children?: ReactNode;
  isForReservation?: boolean;
}

const DaysOfMonth = ({
  inactiveCellStyle,
  calendarWidth,
  dayOfWeekStyle,
  children,
  isForReservation = false,
}: CalendarProps) => {
  const { month, year } = useCalendarStore();
  const { leadingDays, trailingDays } = getMonthRange(year, month);

  return (
    <>
      <div
        className={cn(
          'flex h-fit w-[32.7rem] flex-wrap bg-white',
          isForReservation && calendarWidth,
        )}
      >
        {/* 요일(일~토) */}
        <DayOfWeek dayOfWeekStyle={dayOfWeekStyle} />
        {/* 앞 달 날짜*/}
        <NotThisMonth daysArray={leadingDays} cellStyle={inactiveCellStyle} />
        {/* 이번달 날짜*/}
        {children}
        {/* 다음달 날짜*/}
        <NotThisMonth daysArray={trailingDays} cellStyle={inactiveCellStyle} />
      </div>
    </>
  );
};
export default DaysOfMonth;
