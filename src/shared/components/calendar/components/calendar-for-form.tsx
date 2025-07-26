import ArrowButton from '@/shared/components/calendar/components/arrowButton';
import DaysOfMonth from '@/shared/components/calendar/components/days-of-month';
import {
  defaultCellStyle,
  selectedCircle,
} from '@/shared/components/calendar/libs/constants/calendarStyles';
import { monthName } from '@/shared/components/calendar/libs/constants/monthName';
import { Schedules } from '@/shared/components/calendar/libs/constants/myMockData';
import { formatDateToYMD } from '@/shared/components/calendar/libs/utils/formatDateToYMD';
import { getMonthRange } from '@/shared/components/calendar/libs/utils/getMonthRange';
import { cn } from '@/shared/libs/cn';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

//경고 정리하고, 커밋 한번 남기기 ✨🎨feat: my,hyun테스트 페이지 & 디폴트 ui 정리
//dayOfWeek, arrowButton 파일명 케밥으로 변경
//id다시 클릭하면 취소하는거 해결해야🐛
const CalendarForForm = ({
  setSelectedId,
  scheduleArray,
  calendarWidth,
  dayOfWeekStyle,
  cellStyle,

  isForReservation = false,
}: {
  setSelectedId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  scheduleArray?: Schedules[];
  calendarWidth?: string;
  dayOfWeekStyle?: string;
  cellStyle?: string;

  isForReservation?: boolean;
}) => {
  const { setDate, setSelectedDate, year, month, date } = useCalendarStore();
  const { thisMonthDays } = getMonthRange(year, month);

  //handle onClick, onKeyboard
  const handleClick = (day: number, hasSchedule?: Schedules) => {
    setDate(day);
    setSelectedDate(year, month, day);

    // 스케줄 표시해야 하는 캘린더로 사용중인 경우
    if (scheduleArray && setSelectedId) {
      setSelectedId((prev) => {
        if (prev === hasSchedule?.id) return undefined;
        else return hasSchedule?.id; //hasScehdule? 없으면 알아서 undefined 리턴
      });
    }
  };

  return (
    <div
      className={cn(
        'flex h-fit w-[32.7rem] flex-wrap bg-white',
        isForReservation && calendarWidth,
      )}
    >
      {/* year, month */}
      <div
        className={cn(
          'flex w-full items-center justify-between bg-white text-[1.6rem] font-medium text-gray-950',
        )}
      >
        <div className={cn('mb-[0.8rem] flex gap-[0.2rem]')}>
          <div>{monthName[month]}</div>
          <div>{year}</div>
        </div>
        <div className="flex gap-[1.2rem]">
          <ArrowButton type="left" />
          <ArrowButton type="right" />
        </div>
      </div>
      {/* 이번달 날짜*/}
      <DaysOfMonth
        inactiveCellStyle={cn(defaultCellStyle, cellStyle)}
        dayOfWeekStyle={dayOfWeekStyle}
      >
        {/* children */}
        {thisMonthDays.map((day) => {
          const dateStr = formatDateToYMD(new Date(year, month, day));
          const hasSchedule = scheduleArray?.find(
            (schedule) => schedule.date === dateStr,
          );
          const isSelected = day === date; //--> bg-main 적용

          return (
            <button
              key={day}
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === 'enter' && handleClick(day, hasSchedule)
              }
              onClick={() => handleClick(day, hasSchedule)}
              className={cn(
                defaultCellStyle,
                cellStyle,
                hasSchedule && 'text-main',
                isSelected && 'text-white',
              )}
            >
              {day}
              {isSelected && <div className={cn(selectedCircle, 'bg-main')} />}
              {hasSchedule && (
                <div className={cn(selectedCircle, 'bg-sub -z-2')} />
              )}
            </button>
          );
        })}
      </DaysOfMonth>
    </div>
  );
};

export default CalendarForForm;
