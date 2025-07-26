'use client';

import ArrowButton from '@/shared/components/calendar/components/arrow-button';
import DaysOfMonth from '@/shared/components/calendar/components/days-of-month';
import { cellStyleForCWR } from '@/shared/components/calendar/libs/constants/calendarStyles';
import { MonthReservations } from '@/shared/components/calendar/libs/types/data';
import { formatDateToYMD } from '@/shared/components/calendar/libs/utils/formatDateToYMD';
import { getMonthRange } from '@/shared/components/calendar/libs/utils/getMonthRange';
import { cn } from '@/shared/libs/cn';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

//✅ calendarWidth,dayOfWeekStyle,cellStyle, 프롭으로 '스타일 클래스명'을 넘겨주면, 캘린더의 가로 폭, 요일칸, 날짜칸에 대한 스타일을 입힐수 있습니다.(아니면, className에 바로 작성하셔도 됩니다)
//❗️ 프롭으로 반응형 스타일을 넘겨주는 경우, 클래스명 정렬 순서가 이상하면 스타일 적용 안될 수 있음. 다른 임시 div태그 만들어서, 클래스명 정렬 한번 해보고 복붙하는걸 추천.
const CalendarWithReservations = ({
  monthResArray,
  calendarWidth,
  dayOfWeekStyle,
  cellStyle,
}: {
  monthResArray: MonthReservations[];
  calendarWidth?: string;
  dayOfWeekStyle?: string;
  cellStyle?: string;
}) => {
  const { year, month, date, setDate, setSelectedDate } = useCalendarStore();
  const { thisMonthDays } = getMonthRange(year, month);

  const handleClick = (day: number) => {
    setDate(day);
    setSelectedDate(year, month, day);
  };

  return (
    <div>
      {/* 캘린더 전체 틀 */}
      <div
        className={cn(
          'flex-center h-fit w-[37.5rem] flex-wrap bg-white',
          calendarWidth,
        )}
      >
        {/* <- 0000년 00월 -> */}
        <div className="flex-center h-[4.4rem] w-full gap-10 text-[1.6rem] font-bold">
          <ArrowButton type="left" />
          <div>
            {year}년 {month}월
          </div>
          <ArrowButton type="right" />
        </div>

        {/* 날짜 칸 */}
        <DaysOfMonth
          // 이번달 아닌 날짜 칸 스타일(이번달 날짜 스타일과 동일해야함)
          inactiveCellStyle={cn(cellStyleForCWR, cellStyle)}
          // 요일 칸 스타일
          dayOfWeekStyle={cn(
            'mb-[0.4rem] h-[4rem] w-[5.35rem] text-[1.3rem] font-bold',
            dayOfWeekStyle,
          )}
        >
          {thisMonthDays.map((day) => {
            const dateStr = formatDateToYMD(new Date(year, month, day));
            const hasReservation = monthResArray.find(
              (reservation) => reservation.date === dateStr,
            );
            const resStatus = hasReservation?.reservations;
            const isSelected = date === day;

            return (
              <button
                key={day}
                onKeyDown={(e) => e.key === 'enter' && handleClick(day)}
                onClick={() => handleClick(day)}
                // 이번달 날짜 칸 스타일
                className={cn(
                  !isSelected ? 'hover:bg-sub' : 'hover:bg-orange-100',
                  cellStyleForCWR,
                  cellStyle,
                  isSelected && 'bg-red-100',
                )}
              >
                {day}
                {/* ✅ 날짜별 예약 현황 표시 */}
                {resStatus &&
                  Object.entries(resStatus).map(([key, value]) => {
                    if (value === 0) return null;
                    const isCompleted = key === 'completed';
                    const isConfirmed = key === 'confirmed';
                    const isPending = key === 'pending';

                    return (
                      <div
                        key={key + day}
                        // ✅ 예약 상태 - 반응형 스타일 추가해주세요
                        className={cn(
                          'mt-[0.6rem] w-full rounded-[0.4rem] text-[1.1rem] font-medium',
                          isCompleted && 'bg-gray-50 text-gray-500',
                          isConfirmed && 'bg-orange-100 text-orange-400',
                          isPending && 'bg-sub text-main',
                        )}
                      >
                        <div>
                          {isCompleted && '완료'}
                          {isConfirmed && '승인'}
                          {isPending && '예약'}
                          {value}
                        </div>

                        {/* ✅ 빨간 점 표시 - 반응형 스타일 추가해주세요 */}
                        <div className="absolute top-[0.9rem] left-[3.39rem] size-[0.4rem] rounded-full bg-red-500" />
                      </div>
                    );
                  })}
              </button>
            );
          })}
        </DaysOfMonth>
      </div>
    </div>
  );
};
export default CalendarWithReservations;
