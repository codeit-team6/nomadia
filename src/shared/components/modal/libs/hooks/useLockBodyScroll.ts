import { useEffect } from 'react';

export const useLockBodyScroll = (active: boolean) => {
  useEffect(() => {
    if (active) {
      window.document.body.classList.add('overflow-hidden');
    } else {
      window.document.body.classList.remove('overflow-hidden');
    }
  }, [active]);
};
