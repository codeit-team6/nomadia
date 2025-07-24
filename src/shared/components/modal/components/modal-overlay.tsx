import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useModalStore } from '@/shared/libs/stores/useModalStore';

const ModalOverlay = () => {
  const { isModalOpen, closeModal } = useModalStore();

  // esc 이벤트 등록(closeModal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;
  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/50"
        onClick={closeModal} // 배경 클릭 시 닫힘
        role="presentation"
      ></div>
    </>,
    document.body,
  );
};

export default ModalOverlay;
