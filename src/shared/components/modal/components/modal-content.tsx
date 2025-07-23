import Image from 'next/image';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { modalContentClasses } from '@/shared/components/modal/libs/modalClasses';
import { cn } from '@/shared/libs/cn';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

const ModalContent = ({
  children,
  isCenter,
  extraClassName,
}: {
  children: ReactNode;
  isCenter?: boolean;
  extraClassName?: string;
}) => {
  const { isModalOpen, closeModal, modalType } = useModalStore(); //모달을 중첨해서 여는 경우는 없어서, 전역상태로 관리

  if (!isModalOpen) return null;
  return createPortal(
    <>
      {/* 모달을 중앙정렬 하기 위한 div 태그. 오버레이와 코드가 중복되지만, 
    위치를 1/2 계산하여 중앙정렬하는 방식은,
     화면 크기 변경 시 버벅 거리면서 렌더링 되는게 눈에 보여서, div로 또 싸더라도 flex-center로 정렬하는게 ux경험에 좋겠다고 판단함 */}
      <div
        className={cn(
          isCenter && 'flex-center pointer-events-none fixed inset-0',
        )}
      >
        {/* 모달 */}
        <div
          className={cn(
            'pointer-events-auto rounded-[3rem] bg-white',
            modalContentClasses[modalType],
            extraClassName,
          )}
          onClick={(e) => e.stopPropagation()} // 모달 내용 클릭 시 닫힘 방지
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              closeModal();
            }
          }}
          role="dialog"
          tabIndex={-1}
        >
          {modalType === 'warning' && (
            <Image
              src="/images/warning.svg"
              alt="warning image"
              width={49}
              height={49}
              className="md:size-[8.8rem]"
            />
          )}
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ModalContent;
