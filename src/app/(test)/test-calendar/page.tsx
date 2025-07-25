'use client';
import { useState } from 'react';

import ArrowButton from '@/shared/components/calendar/components/arrowButton';
import Calendar from '@/shared/components/calendar/components/calendar';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

export default function Page() {
  const [testState, setTestState] = useState(11);
  const { selectedDate, year, month, date } = useCalendarStore();
  //   const mockData = mockReservationData; // mock data🗑️
  const testTargetDateList: number[] = [1, 22, 13, 15, 3, 9, 26];
  return (
    <div className="bg-pink-100">
      <div className="text-3xl">testState:{testState}</div>
      <div className="text-3xl">selectedDate:{selectedDate}</div>
      <div className="text-3xl">{year}년</div>
      <div className="text-3xl">{month + 1}월</div>
      <div className="border-b-amber-950 text-3xl text-green-400">
        date:{date}
      </div>
      <ArrowButton type="left" />
      <ArrowButton type="right" />

      <Calendar
        cellStyle="relative text-green-400 flex-col z-0 font-bold w-[7rem]  h-[7rem] border-b  border-b-amber-950"
        calendarWidth="w-[49rem]"
        targetCell={testTargetDateList}
        targetStyle="text-main"
        onCellClick={() => {
          setTestState(testState + year);
        }}
        dayOfWeekStyle="mb-[2rem] w-[7rem]"
        // mockData={mockData}
      >
        <div className="felx flex-col">
          <div className="absolute top-2.5 right-2.5 size-2.5 rounded-4xl bg-amber-500"></div>
          <div className="text-[1.2rem] text-blue-400">gkgk</div>
          <div className="text-[1.2rem] text-purple-400">dkdkdkdkdkd</div>
          <div className="bg-sub absolute top-0 left-0 -z-1 size-full rounded-full"></div>
          {/* 배경동그라미: -z-1, cellStyle: z-0 */}
        </div>
      </Calendar>
    </div>
  );
}
