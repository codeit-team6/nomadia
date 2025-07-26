import Image from 'next/image';

import { cn } from '@/shared/libs/cn';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

const ArrowButton = ({
  type,
  extraClassName,
}: {
  type: 'left' | 'right';
  extraClassName?: string;
}) => {
  const { month, year, setMonth, setYear } = useCalendarStore();
  const isRight = type === 'right';

  const handleClick = () => {
    const isFirstMonth = month === 0;
    const isLastMonth = month === 11;

    if (isRight) {
      if (isLastMonth) {
        setYear(year + 1);
        setMonth(0);
      } else {
        setMonth(month + 1);
      }
    } else {
      if (isFirstMonth) {
        setYear(year - 1);
        setMonth(11);
      } else {
        setMonth(month - 1);
      }
    }
  };

  return (
    <Image
      src="/images/icons/arrow.svg"
      alt="arrow"
      width={24}
      height={24}
      className={cn(
        type === 'right' && 'scale-x-[-1] transform',
        extraClassName,
      )}
      onClick={handleClick}
      tabIndex={0}
    />
  );
};
export default ArrowButton;
