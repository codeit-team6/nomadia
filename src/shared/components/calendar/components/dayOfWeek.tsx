import { cn } from '@/shared/libs/cn';

const DayOfWeek = ({ dayOfWeekStyle }: { dayOfWeekStyle?: string }) => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <>
      {days.map((day, i) => (
        <div
          key={`${i}-${day}`}
          className={cn(
            'flex-center h-[4.6rem] w-[5rem] text-[1.6rem] font-semibold text-gray-800',
            dayOfWeekStyle,
          )}
        >
          {day}
        </div>
      ))}
    </>
  );
};
export default DayOfWeek;
