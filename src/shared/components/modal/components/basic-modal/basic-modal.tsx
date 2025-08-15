import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import ModalContent from '@/shared/components/modal/components/modal-content';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';

//✨
const BasicModal = ({
  type,
  extraClassName,
  children,
}: {
  type: 'confirm' | 'warning' | 'custom';
  extraClassName?: string;
  children: ReactNode;
}) => {
  const { isModalOpen, closeModal, setModalType } = useModalStore();

  // 전역 타입 등록 - modal-button, modal-header에서 사용
  // 다른모달에서도 사용하면, 훅으로 빼볼까✅
  useEffect(() => {
    if (isModalOpen) {
      setModalType(type);
    }
  }, [isModalOpen, type, setModalType]);

  // 모달에 먼저 포커스 -> esc동작 가능
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isModalOpen && modalRef.current) modalRef.current.focus();
  }, [isModalOpen]);

  if (isModalOpen) {
    return createPortal(
      <>
        {/* 오버레이 */}
        <div
          ref={modalRef}
          className="flex-center fixed inset-0 z-100 bg-black/50"
          onClick={() => {
            closeModal();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              closeModal();
            }
          }}
          role="presentation"
        >
          {/* 모달 */}
          <ModalContent type={type} extraClassName={extraClassName}>
            using basic modal
            {children}
          </ModalContent>
        </div>
      </>,
      document.body,
    );
  }
};

export default BasicModal;
