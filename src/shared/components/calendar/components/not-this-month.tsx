import { cn } from '@/shared/libs/cn';

const NotThisMonth = ({
  daysArray,
  cellStyle,
}: {
  daysArray: number[];
  cellStyle?: string;
}) => {
  return daysArray.map((date) => (
    <div
      key={`lead-${date}`}
      className={cn(
        'flex-center h-[5.4rem] w-[5rem] text-[1.6rem] font-medium',
        cellStyle,
        'text-gray-300',
      )}
    >
      {date}
    </div>
  ));
};

export default NotThisMonth;
