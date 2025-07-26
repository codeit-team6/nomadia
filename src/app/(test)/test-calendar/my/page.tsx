'use client';
import { useState } from 'react';

import { mockScheduleData } from '@/features/(test)/mockSchedules';
import CalendarForForm from '@/shared/components/calendar/components/calendar-for-form';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

export default function Page() {
  // test My
  const [selectedId, setSelectedId] = useState<number>();
  const mockData = mockScheduleData;

  // display data for test
  const { date, selectedDate } = useCalendarStore();

  return (
    <div className="bg-purple-100">
      <div className="text-3xl text-black">date:{date}</div>
      <div className="text-3xl text-black">selectedDate:{selectedDate}</div>
      <div className="text-3xl text-black">selectedId:{selectedId}</div>
      <CalendarForForm
        setSelectedId={setSelectedId}
        scheduleArray={mockData}
        isForReservation={true}
        calendarWidth="md:w-[35.9rem] lg:w-[35rem]"
        dayOfWeekStyle="md:my-[1.36rem] md:w-[5.128rem] lg:my-0 lg:w-[5rem]"
        cellStyle="md:my-[1.36rem] md:w-[5.128rem] lg:my-0 lg:w-[5rem]"
      />
    </div>
  );
}
