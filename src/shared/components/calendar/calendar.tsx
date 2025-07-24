import { useState } from 'react';

import { Button } from '@/shared/libs/shadcn/components/ui/button';

const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  //   useEffect(() => {
  //     const { leadingDays, thisMonthDays, trailingDays } = getMonthRange(
  //       year,
  //       month,
  //     );
  //   }, [date, month]);

  const getMonthRange = (year: number, month: number) => {
    const endOfMonth = new Date(year, month + 1, 0); // 이번달 마지막일
    const endOfPrevMonth = new Date(year, month, 0).getDate(); // 이전달 마지막일 (이번달의 0일 = 이전달의 마지막일)
    const startDayNum = new Date(year, month, 1).getDay(); // 남은 칸 갯수(이전달) == 이번달 1일의 요일(0~6)(일~토)
    const endDayNum = endOfMonth.getDay();

    // 앞 달에 해당하는 날짜 []
    const leadingDays = Array.from({ length: startDayNum }, (_, i) => {
      return endOfPrevMonth - i;
    }).reverse();
    // 다음 달에 해당하는 날짜 []
    const trailingDays = Array.from({ length: 6 - endDayNum }, (_, i) => {
      return i + 1;
    });
    // 이번달 날짜 []
    const thisMonthDays = Array.from(
      { length: endOfMonth.getDate() },
      (_, i) => {
        return i + 1;
      },
    );
    return { leadingDays, trailingDays, thisMonthDays };
  };

  const { leadingDays, trailingDays, thisMonthDays } = getMonthRange(
    year,
    month,
  );
  console.log(leadingDays);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <>
      <p className="text-6xl">{year}년</p>
      <p className="text-6xl">{month + 1}월</p>
      <p className="text-6xl">today: {date}</p>
      <div className="flex h-fit w-[35rem] flex-wrap bg-amber-100">
        {days.map((day) => (
          <div
            key={day}
            className="flex-center h-[4.6rem] w-[5rem] text-[1.6rem] font-semibold text-gray-800"
          >
            {day}
          </div>
        ))}
        {leadingDays.map((day) => (
          <div
            key={'lead' + day}
            className="flex-center h-[5.4rem] w-[5rem] text-[1.6rem] font-medium text-gray-300"
            onClick={() => setDate(day)}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'enter' && setDate(day)}
            role="button"
          >
            {day}
          </div>
        ))}
        {thisMonthDays.map((day) => (
          <div
            key={day}
            className="flex-center h-[5.4rem] w-[5rem] text-[1.6rem] font-medium text-gray-800"
          >
            {day}
          </div>
        ))}
        {trailingDays.map((day) => (
          <div
            key={'trail' + day}
            className="flex-center h-[5.4rem] w-[5rem] text-[1.6rem] font-medium text-gray-300"
          >
            {day}
          </div>
        ))}
      </div>
      <Button
        onClick={() =>
          setMonth(() => {
            if (month + 1 === 1) {
              setYear(year - 1);
              return 11;
            }
            return month - 1;
          })
        }
      >
        이전달
      </Button>
      <Button
        onClick={() =>
          setMonth(() => {
            if (month + 1 === 12) {
              setYear(year + 1);
              return 0;
            }
            return month + 1;
          })
        }
      >
        다음달
      </Button>
    </>
  );
};
export default Calendar;
