import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useModalStore } from '@/shared/libs/stores/useModalStore';

const ModalOverlay = () => {
  const { isModalOpen, closeModal } = useModalStore();

  //   useEffect 훅은 컴포넌트 함수 내에서 호출되어야 하며, 호출 자체는 렌더링 중에 일어남
  // 그러나 useEffect에 넘긴 콜백 함수는 렌더링이 끝난 후 비동기적으로 실행됨
  // 컴포넌트가 렌더링을 안 하면(조건부 return으로 훅 호출 전 종료) 훅 호출도 없고, 콜백도 실행 안 됨
  // 그럼 이펙트 내부에서의 if (!isModalOpen) return;가 굳이 필요한가..? JSX그려내기 전의 if (!isModalOpen) return null;에서 끊기면 이 이펙트도 실행되지 않고
  // 불필요한 이벤트가 등록될 일도 없는거 아닌가?

  // esc 이벤트 등록(closeModal)
  useEffect(() => {
    if (!isModalOpen) return;

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
