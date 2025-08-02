import Image from 'next/image';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { modalContentClasses } from '@/shared/components/modal/libs/modalClasses';
import { cn } from '@/shared/libs/cn';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

/**
 * @author 지윤
 *
 * @component second modal 중복 모달 - 한 타이밍에 두개 중첩으로 열리는 모달에 사용 (한페이지에 따로 열리는 모달 두개 X)
 * @prop {string} extraClassName? - 모달 스타일 추가(margin, padding, height 등)
 * @prop {ReactNode} children - 모달 내부에 렌더링될 내용
 * @prop {ReactNode} type - 모달 타입: 'confirm' | 'warning' | 'custom'
 *
 * */
const SecondModal = ({
  children,
  type,
  extraClassName,
}: {
  children: ReactNode;
  type: 'confirm' | 'warning' | 'custom';
  extraClassName?: string;
}) => {
  // useModalStore()
  const {
    isSecondModalOpen,
    closeSecondModal,
    setSecondModalType,
    secondModalType,
  } = useModalStore();

  // 전역 타입 등록 - 버튼,헤더 컴포넌트에서 사용
  useEffect(() => {
    if (isSecondModalOpen) {
      setSecondModalType(type);
    }
  }, [isSecondModalOpen, type, setSecondModalType]);

  // 오버레이에 esc 이벤트 등록(closeModal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSecondModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSecondModalOpen, closeSecondModal, secondModalType]);

  // return JSX
  if (isSecondModalOpen) {
    return createPortal(
      <>
        {/* 오버레이 */}
        <div
          className="flex-center fixed inset-0 z-100 bg-black/50"
          onClick={() => {
            closeSecondModal();
          }}
          role="presentation"
        >
          {/* 모달 */}
          <div
            className={cn(
              'pointer-events-auto rounded-[3rem] bg-white',
              modalContentClasses[secondModalType],
              extraClassName,
            )}
            onClick={(e) => e.stopPropagation()} // 모달 내용 클릭 시 닫힘 방지
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                closeSecondModal();
              }
            }}
            role="dialog"
            tabIndex={-1}
          >
            {/* 경고 이미지 */}
            {type === 'warning' && (
              <Image
                src="/images/warning.svg"
                alt="warning image"
                width={49}
                height={49}
                className="md:size-[8.8rem]"
              />
            )}
            {/* children */}
            {children}
          </div>
        </div>
      </>,
      document.body,
    );
  }
};

export default SecondModal;
