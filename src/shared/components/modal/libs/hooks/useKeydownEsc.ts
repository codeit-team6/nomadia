import { useEffect } from 'react';

export const useKeydownEsc = (closeModal: () => void, active: boolean) => {
  useEffect(() => {
    if (!active) return;
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [closeModal, active]);
};
