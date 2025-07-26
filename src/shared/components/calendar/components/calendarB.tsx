// import { ReactNode } from 'react';

// import DayOfWeek from '@/shared/components/calendar/components/dayOfWeek';
// import NotThisMonth from '@/shared/components/calendar/components/not-this-month';
// import { getMonthRange } from '@/shared/components/calendar/libs/utils/getMonthRange';
// import { cn } from '@/shared/libs/cn';
// import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

// interface CalendarProps {
//   cellStyle?: string;
//   calendarWidth?: string;
//   onCellClick?: () => void;
//   children?: ReactNode;
//   targetCell?: number[];
//   dayOfWeekStyle?: string;
//   targetStyle?: string;
//   mockData?: object[];
// }
// const CalendarB = ({
//   cellStyle,
//   calendarWidth,
//   onCellClick,
//   children,
//   targetCell,
//   dayOfWeekStyle,
//   targetStyle,
//   mockData,
// }: CalendarProps) => {
//   const { month, year, setDate, setSelectedDate, selectedDate } =
//     useCalendarStore();

//   const { leadingDays, trailingDays, thisMonthDays } = getMonthRange(
//     year,
//     month,
//   );

//   return (
//     <>
//       <div
//         className={cn('flex h-fit w-[35rem] flex-wrap bg-white', calendarWidth)}
//       >
//         {/* 요일(일~토) */}
//         <DayOfWeek dayOfWeekStyle={dayOfWeekStyle} />
//         {/* 앞 달 날짜*/}
//         <NotThisMonth daysArray={leadingDays} cellStyle={cellStyle} />
//         {/* 이번달 날짜*/}
//         {children}
//         {/* 다음달 날짜*/}
//         <NotThisMonth daysArray={trailingDays} cellStyle={cellStyle} />
//       </div>
//     </>
//   );
// };
// export default CalendarB;
