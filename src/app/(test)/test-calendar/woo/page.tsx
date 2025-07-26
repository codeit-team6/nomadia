'use client';

import ArrowButton from '@/shared/components/calendar/components/arrowButton';
import DaysOfMonth from '@/shared/components/calendar/components/days-of-month';
import { mockReservationData } from '@/shared/components/calendar/libs/constants/mockData';
import { getMonthRange } from '@/shared/components/calendar/libs/utils/getMonthRange';
import { cn } from '@/shared/libs/cn';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

export default function Page() {
  const { selectedDate, year, month, date } = useCalendarStore();

  //test B
  const mockData = mockReservationData; // mock data🗑️
  const { thisMonthDays } = getMonthRange(year, month);
  const { setDate, setSelectedDate } = useCalendarStore();

  return (
    <div className="bg-pink-100">
      <div className="text-3xl">selectedDate:{selectedDate}</div>
      <div className="text-3xl">date:{date}</div>

      {/* ✅test CalendarB */}
      {/* <- 0000년 00월 -> */}
      {/* 🐛 calendarForForm도 이런식으로 캘린더위드 따로 받지 말고, 여기서 전체 랩하는거 해결하기 */}
      <div className="flex-center h-fit w-[37.5rem] flex-wrap bg-white">
        <div className="flex-center h-[4.4rem] w-full gap-10 font-bold text-[1.6]">
          <ArrowButton type="left" />
          <div>{year}</div>
          <div>{month}</div>
          <ArrowButton type="right" />
        </div>

        <div className="mb-[0.4rem] h-[4rem] w-[5.35rem] text-[1.3rem] font-bold"></div>
        {/* 이번달 날짜 */}
        <DaysOfMonth
          inactiveCellStyle="relative text-green-400 flex-col z-0 font-bold w-[7rem]  h-[7rem] border-b  border-b-amber-950"
          dayOfWeekStyle="mb-[0.4rem] h-[4rem] w-[5.35rem] text-[1.3rem] font-bold"
        >
          {thisMonthDays.map((day) => {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasSchedule = mockData.find((item) => item.date === dateStr);
            const completed = hasSchedule?.reservations.completed;
            return (
              <button
                key={day}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'enter' && setDate(day)}
                onClick={() => {
                  setDate(day);
                  setSelectedDate(year, month, day);
                }}
                className={cn(
                  'flex-center h-[5.4rem] w-[5rem] flex-col text-[1.6rem] font-medium text-gray-800',
                )}
              >
                {day}
                {hasSchedule && completed !== 0 && (
                  <div className="bg-gray-50 text-[1.1rem] font-medium text-gray-500">
                    완료{hasSchedule?.reservations.completed}
                  </div>
                )}
              </button>
            );
          })}
        </DaysOfMonth>
      </div>
      {/* 💥Route to test page */}
      {/* <button
        className="text-3xl text-purple-400"
        onClick={() => router.push('/my')}
      >
        test my calendar
      </button>
      <button
        className="text-3xl text-purple-400"
        onClick={() => router.push('/hyun')}
      >
        test hyun calendar
      </button> */}
    </div>
  );
}
