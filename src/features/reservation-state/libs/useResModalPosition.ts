import { useEffect, useState } from 'react';

import { useCalendarStore } from '@/shared/components/calendar/libs/stores/useCalendarStore';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';

export const useResModalPosition = (
  calendarRef: React.RefObject<HTMLDivElement | null>,
): React.CSSProperties | undefined => {
  const { selectedDate, date } = useCalendarStore();
  const { isDesktop } = useWindowSize();
  const [position, setPosition] = useState<React.CSSProperties>();

  useEffect(() => {
    if (!isDesktop) return undefined;
    const calendarRect = calendarRef.current?.getBoundingClientRect();
    if (selectedDate && calendarRect && date) {
      const cell = document.querySelector(`[data-date='${date}']`);
      if (!cell) return;
      const cellRect = cell.getBoundingClientRect();

      setPosition({
        left: calcLeft(cellRect, calendarRect) + 'px',
        top: calcTop(cellRect, calendarRect) + 'px',
        position: 'absolute',
      });
    } else setPosition({ display: 'none' });
  }, [calendarRef, date, isDesktop, selectedDate]);
  return position;
};

const MODAL_WIDTH = 333;
const MODAL_HEIGHT = 444;

const calcLeft = (cellRect: DOMRect, calendarRect: DOMRect) => {
  const left = cellRect.left - calendarRect.left;
  const hasEnoughSpaceRight = window.innerWidth - cellRect.right >= MODAL_WIDTH;
  if (hasEnoughSpaceRight) {
    return left + cellRect.width;
  } else {
    return left - MODAL_WIDTH;
  }
};
const calcTop = (cellRect: DOMRect, calendarRect: DOMRect) => {
  const top = cellRect.top - calendarRect.top;
  const cellTop = cellRect.top + window.scrollY;
  const hasEnoughSpaceBottom =
    document.body.clientHeight - cellTop >= MODAL_HEIGHT;
  if (hasEnoughSpaceBottom) {
    return top;
  } else {
    return top - MODAL_HEIGHT + cellRect.height;
  }
};
