'use client';
import { ReactNode, useEffect } from 'react';

import Modal from '@/shared/components/modal/components';
import { cn } from '@/shared/libs/cn';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

const AdaptiveModal = ({
  extraClassName,
  children,
}: {
  extraClassName?: string;
  children: ReactNode;
}) => {
  const { width } = useWindowSize();

  const {
    openModal,
    isModalOpen,
    appear,
    disappearModal,
    isDesktop,
    setIsDesktop,
  } = useModalStore();

  // 모달 항시 렌더링
  useEffect(() => {
    openModal();
  }, [openModal]);

  // 윈도우 사이즈 감지 및 설정 & 데스크탑으로 넘어가면 모달 자동으로 사라짐
  useEffect(() => {
    if (width && width >= 1024) {
      setIsDesktop(true);
      disappearModal();
    } else {
      setIsDesktop(false);
    }
  }, [width, disappearModal, setIsDesktop]);

  return (
    <>
      <div className="text-4xl">appear:{Number(appear)}</div>
      <div className="text-4xl">isModalOpen:{Number(isModalOpen)}</div>
      <Modal
        type="custom"
        hasOverlay={isDesktop ? false : appear ? true : false}
        isCenter={false}
        extraClassName={cn(
          extraClassName,
          !isDesktop &&
            'fixed bottom-0 left-0 z-90 w-full rounded-b-none transition-transform duration-300 ease-out',
          !isDesktop && (appear ? 'translate-y-0' : 'translate-y-full'),
        )}
        onClickOverlay={() => disappearModal()}
      >
        {children}
      </Modal>
    </>
  );
};
export default AdaptiveModal;
