import { useEffect, useState } from 'react';

import { useCalendarStore } from '@/shared/components/calendar/libs/stores/useCalendarStore';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';

export const useResStateModalPosition = (
  selectedCellRef: React.RefObject<HTMLButtonElement | null>,
): React.CSSProperties | undefined => {
  const { selectedDate } = useCalendarStore();
  const { isDesktop } = useWindowSize();
  const [position, setPosition] = useState<React.CSSProperties>();

  useEffect(() => {
    const selectedCell = selectedCellRef.current?.getBoundingClientRect();
    if (!isDesktop) return undefined;
    if (selectedDate && selectedCell) {
      setPosition({
        left: calcLeft(selectedCell) + 'px',
        top: calcTop(selectedCell) + 'px',
        position: 'absolute',
      });
    } else setPosition({ display: 'none' });
  }, [isDesktop, selectedDate, selectedCellRef]);
  return position;
};

const calcLeft = (selectedCell: DOMRect) => {
  const left = selectedCell.left;
  const right = selectedCell.right;
  const cellWidth = selectedCell.width;
  const windowWidth = window.innerWidth;
  const MODAL_WIDTH = 333;
  if (windowWidth - right < MODAL_WIDTH) {
    return left - MODAL_WIDTH;
  } else {
    return left + cellWidth;
  }
};
const calcTop = (selectedCell: DOMRect) => {
  const y = selectedCell.y + window.scrollY;
  const cellBottom = selectedCell.bottom + window.scrollY;
  const bodyHeight = document.body.scrollHeight;
  const MODAL_HEIGHT = 444;

  if (bodyHeight - y < MODAL_HEIGHT) {
    console.log('window', bodyHeight);
    console.log('cell', cellBottom);
    return cellBottom - MODAL_HEIGHT;
  } else {
    console.log('y', y);
    return y;
  }
};
