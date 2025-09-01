import { AvailableScheduleList } from '@/features/activityId/libs/types/availableSchedule';
import ArrowButton from '@/shared/components/calendar/components/fragments/arrow-button';
import DaysOfMonth from '@/shared/components/calendar/components/fragments/days-of-month';
import {
  defaultCellStyle,
  selectedCircle,
} from '@/shared/components/calendar/libs/constants/calendarStyles';
import { useCalendarStore } from '@/shared/components/calendar/libs/stores/useCalendarStore';
import { formatDateToYMD } from '@/shared/components/calendar/libs/utils/formatDateToYMD';
import { getMonthRange } from '@/shared/components/calendar/libs/utils/getMonthRange';
import { cn } from '@/shared/libs/cn';

/**
 * @author 지윤
 * @component
 * 폼 내에서 사용할 캘린더 컴포넌트입니다. 날짜를 선택하거나, 날짜별 스케줄을 확인할 수 있습니다.
 * 모든 프롭은 선택값이며, 필요에 따라 선택적으로 사용해주세요.
 * 스타일 커스터마이징을 위한 프롭을 활용해서 반응형 스타일 등을 추가할수 있습니다.
 *
 * @param {function} [setSelectedId] - 특정 날짜(혹은 셀)의 ID를 선택할 때 호출되는 상태 설정 함수입니다. 날짜 클릭 시 트리거됩니다.
 * @param {Schedules[]} [scheduleArray] - 날짜별 스케줄 정보 배열입니다.
 * @param {string} [calendarWidth] - 캘린더 전체의 가로폭을 조정하는 Tailwind 클래스 문자열입니다. 예:"md:w-[38rem]".
 * @param {string} [dayOfWeekStyle] - 요일(일~토) 셀에 적용할 Tailwind 클래스 문자열입니다. 반응형 스타일도 전달 가능.
 * @param {string} [cellStyle] - 날짜 셀에 적용할 Tailwind 클래스 문자열입니다. 선택 상태, 스케줄 상태 등에 병합되어 사용됩니다.
 * @param {boolean} [isForReservation=false] - 예약 선택 용도로 사용하는지 여부를 나타냅니다. `true`일 경우 스케줄이 있는 날짜가 표시됩니다.(체험상세페이지에서 사용)
 * @param {()=>void} [changeFormValue] - 폼 내부의 value값 업데이트를 selectedDate업데이트 시점과 동시에 하고 싶은 경우
 *
 * @example
 * <CalendarForForm
 *   scheduleArray={data}
 *   calendarWidth="md:w-[38rem] lg:w-[40rem]..."
 *   dayOfWeekStyle="text-gray-500 md:w-[2rem]..."
 *   cellStyle="relative h-[10rem] text-[1.4rem]..."
 *   isForReservation={true}
 * />
 */

const CalendarForForm = ({
  scheduleArray,
  calendarWidth,
  dayOfWeekStyle,
  cellStyle,
  changeFormValue,
}: {
  scheduleArray?: AvailableScheduleList;
  calendarWidth?: string;
  dayOfWeekStyle?: string;
  cellStyle?: string;
  changeFormValue?: () => void;
}) => {
  const { setDate, setSelectedDate, year, month, selectedDate } =
    useCalendarStore();
  const { thisMonthDays } = getMonthRange(year, month);

  const handleClick = (day: number) => {
    setDate(day); //내부 작동: '일' 업데이트(*이미 클릭한 날짜를 클릭하면 null로 리셋)
    setSelectedDate(year, month, day);

    // 스케줄 표시하는 캘린더로 사용중인 경우
    if (scheduleArray && changeFormValue) {
      changeFormValue();
    }
  };

  return (
    <div
      className={cn(
        'flex h-fit w-[32.69rem] flex-wrap bg-white',
        calendarWidth,
      )}
    >
      {/* year, month */}
      <div
        className={cn(
          'mb-[0.4rem] flex w-full items-center justify-between bg-white',
        )}
      >
        <div className="flex gap-[0.2rem] pl-[1rem] text-[1.8rem] font-medium text-gray-950">
          <div>
            {year}년 {month + 1}월
          </div>
        </div>
        <div className="flex gap-[1.2rem]">
          <ArrowButton type="left" />
          <ArrowButton type="right" />
        </div>
      </div>
      {/* 이번달 날짜*/}
      <DaysOfMonth
        inactiveCellStyle={cn('flex-center', defaultCellStyle, cellStyle)}
        dayOfWeekStyle={dayOfWeekStyle}
      >
        {/* children */}
        {thisMonthDays.map((day) => {
          const dateStr = formatDateToYMD(new Date(year, month, day));
          const isSelected = dateStr === selectedDate;
          const hasSchedule = scheduleArray?.find(
            (schedule) => schedule.date === dateStr,
          );

          return (
            <button
              disabled={!hasSchedule}
              type="button"
              key={day}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(day)}
              onClick={() => handleClick(day)}
              className={cn(
                'flex-center text-gray-300',
                defaultCellStyle,
                cellStyle,
                hasSchedule &&
                  'hover:text-main cursor-pointer text-gray-800 transition hover:scale-110',
                isSelected && 'text-white hover:text-white',
              )}
            >
              {day}
              {hasSchedule && <div className={cn(selectedCircle, 'bg-sub')} />}
              {isSelected && <div className={cn(selectedCircle, 'bg-main')} />}
            </button>
          );
        })}
      </DaysOfMonth>
    </div>
  );
};

export default CalendarForForm;
