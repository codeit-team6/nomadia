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
      <div className="text-3xl">{year}년</div>
      <div className="text-3xl">{month + 1}월</div>
      <div className="border-b-amber-950 text-3xl text-green-400">
        date:{date}
      </div>
      <ArrowButton type="left" />
      <ArrowButton type="right" />

      {/* <Calendar
        cellStyle="relative text-green-400 flex-col z-0 font-bold w-[7rem]  h-[7rem] border-b  border-b-amber-950"
        calendarWidth="w-[49rem]"
        targetCell={testTargetDateList}
        targetStyle="text-main"
        onCellClick={() => {
          setTestState(testState + year);
        }}
        dayOfWeekStyle="mb-[2rem] w-[7rem]"
        mockData={mockData}
      >
        <div className="felx flex-col">
          <div className="absolute top-2.5 right-2.5 size-2.5 rounded-4xl bg-amber-500"></div>
          <div className="text-[1.2rem] text-blue-400">gkgk</div>
          <div className="text-[1.2rem] text-purple-400">dkdkdkdkdkd</div>
          <div className="bg-sub absolute top-0 left-0 -z-1 size-full rounded-full"></div>
          {/* 배경동그라미: -z-1, cellStyle: z-0 */}
      {/* </div>
      </Calendar> */}

      {/* ✅test CalendarB */}

      <DaysOfMonth
        inactiveCellStyle="relative text-green-400 flex-col z-0 font-bold w-[7rem]  h-[7rem] border-b  border-b-amber-950"
        dayOfWeekStyle="mb-[2rem] w-[7rem]"
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
