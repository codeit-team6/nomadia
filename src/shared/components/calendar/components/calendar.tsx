import { ReactNode } from 'react';

import DayOfWeek from '@/shared/components/calendar/components/dayOfWeek';
import NotThisMonth from '@/shared/components/calendar/components/not-this-month';
import { getMonthRange } from '@/shared/components/calendar/libs/utils/getMonthRange';
import { cn } from '@/shared/libs/cn';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

interface CalendarProps {
  cellStyle?: string;
  calendarWidth?: string;
  onCellClick?: () => void;
  children?: ReactNode;
  targetCell?: number[];
  dayOfWeekStyle?: string;
  targetStyle?: string;
  // mockData?: object[];
}
const Calendar = ({
  cellStyle,
  calendarWidth,
  onCellClick,
  children,
  targetCell,
  dayOfWeekStyle,
  targetStyle,
  // mockData,
}: CalendarProps) => {
  const { month, year, setDate, setSelectedDate, selectedDate } =
    useCalendarStore();

  const { leadingDays, trailingDays, thisMonthDays } = getMonthRange(
    year,
    month,
  );

  return (
    <>
      {/* 겉 틀에 w,h조절 가능해야할것같음-extraClassName */}
      <div
        className={cn('flex h-fit w-[35rem] flex-wrap bg-white', calendarWidth)}
      >
        {/* 요일(일~토) */}
        <DayOfWeek dayOfWeekStyle={dayOfWeekStyle} />
        <NotThisMonth daysArray={leadingDays} cellStyle={cellStyle} />

        {/* 이번달 날짜 (1~endDay) */}
        {thisMonthDays.map((day) => {
          const isTartgetCell = targetCell?.includes(day);
          // const dateStr = `year-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          // const hasSchedule = mockData?.find((item) => item.date === dateStr);
          return (
            <div
              key={day}
              onClick={() => {
                setDate(day);
                setSelectedDate(year, month, day);
                onCellClick?.(); //사용자 커스텀 함수 추가
                console.log('clicked!', selectedDate);
              }}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'enter' && setDate(day)}
              role="button"
              className={cn(
                'flex-center h-[5.4rem] w-[5rem] text-[1.6rem] font-medium text-gray-800',
                cellStyle,
                isTartgetCell && targetStyle,
              )}
            >
              {day}
              {isTartgetCell && children}
            </div>
          );
        })}
        <NotThisMonth daysArray={trailingDays} cellStyle={cellStyle} />
      </div>
    </>
  );
};
export default Calendar;
