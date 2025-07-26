'use client';

import CalendarForForm from '@/shared/components/calendar/components/calendar-for-form';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

export default function Page() {
  //test
  const { date, selectedDate } = useCalendarStore();
  return (
    <div className="bg-green-100">
      <div className="text-3xl text-black">
        date:{date} selectedDate:{selectedDate}
      </div>
      <CalendarForForm />
    </div>
  );
}
