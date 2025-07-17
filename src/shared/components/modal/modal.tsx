// 프롭타입을 단일 타입으로 vs  Discriminated Union(구분 유니언)으로
// 단일 타입으로
// type ModalProps = {
//   type: 'warning' | 'confirm';
//   title: string;
//   message: string;
//   onConfirm?: () => void;
//   onYes?: () => void;
//   onNo?: () => void;
// };
// 이게 코드가 줄어드니까 좋다고 생각했으나..
//이렇게 하면 type: 'confirm'일 때도 onYes, onNo가 들어갈 수 있고, type: 'warning'인데도 onYes, onNo를 안 넣어도 타입 에러가 안 나요.

import Image from 'next/image';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/libs/cn';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

// 즉:
// 모든 필드를 optional로 두면 → 잘못된 조합이 타입 체크에서 안 잡힘
// 결국 런타임 에러가 날 수 있음 (예: type: 'warning'인데 onYes가 없음)
// 근데 그렇게 실수할 일이 있을까? 싶지만 타입스크립트의 장점을 백분 활용한다면, 구분 유니언으로 구현하는게 맞는것이다..

// 모달 사용 구조
// <Modal>
// <<Header>
// 모달 타이틀
// </Header>
// <Body>
// 모달 본문
// </Body>
// <grayButton>취소하기</grayButton>
// <BlackButton>생성하기</BlackButton>>
// </Modal>

// <Modal>
// <div>
// ...사용자가 커스텀한 모달 내용물
// </div>
// </Modal>

//warningImage, xButton = boolean으로 받아서 렌더링
type ModalProps = {
  type: 'confirm' | 'warning' | 'custom';
  children: ReactNode;
};

const Modal = ({ type, children }: ModalProps) => {
  const { isModalOpen, closeModal, setModalType, modalType } = useModalStore();

  useEffect(() => {
    if (isModalOpen) {
      setModalType(type);
    }
  }, [isModalOpen, type, setModalType]);

  if (!isModalOpen) return null;
  return createPortal(
    <div
      className="flex-center fixed inset-0 bg-black/50"
      onClick={closeModal} // 배경 클릭 시 닫힘
      role="presentation"
      //   onKeyDown={(e) => {
      //     if (e.key === 'Escape' || e.key === 'Enter') {
      //       closeModal();
      //     }
      //   }}
    >
      <div
        className={cn(
          'rounded-[3rem] bg-white text-center',
          modalType === 'confirm' &&
            'flex h-[14rem] w-[32rem] flex-col items-center p-[3rem] pt-[3.4rem] md:h-[17rem] md:w-[40rem] md:p-[4rem] md:pb-[3rem]',
          modalType === 'warning' &&
            'flex w-[32rem] flex-col items-center p-[3rem] pb-[2.4rem] md:w-[40rem] md:p-[3rem]',
          modalType === 'custom' && 'p-[2.4rem]',
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
    </div>,
    document.body,
  );
};

const ModalHeader = ({ children }: { children: ReactNode }) => {
  const { modalType } = useModalStore();

  return (
    <p
      className={cn(
        'text-[1.6rem] font-semibold text-black md:text-[2rem]',
        modalType === 'confirm' && 'mb-[1.6rem] md:mb-[2rem]',
        modalType === 'warning' && 'mb-[2rem] md:mb-[2.4rem]',
        modalType === 'custom' && 'mb-[1.2rem] md:mb-[1.6rem]',
      )}
    >
      {children}
    </p>
  );
};

const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <div className="flex gap-2 md:gap-3">{children}</div>;
};

const Button = ({
  color,
  ariaLabel,
  onClick,
  children,
}: {
  color: 'white' | 'blue';
  ariaLabel: string;
  onClick?: () => void;
  children: ReactNode;
}) => {
  const { modalType, closeModal } = useModalStore();

  return (
    <button
      className={cn(
        'w-full rounded-[1.2rem] py-3 text-[1.4rem] md:rounded-[1.4rem] md:py-3.5 md:text-[1.6rem]',
        color === 'white' &&
          'border border-gray-200 bg-white font-medium text-gray-600',
        color === 'blue' && 'bg-main font-semibold text-white',
        modalType === 'confirm' && 'w-[16rem] md:w-[20rem]',
        modalType === 'warning' && 'w-[11.3rem] md:w-[13.5rem]',
        modalType === 'custom' && 'w-full md:mb-[2rem]',
      )}
      aria-label={ariaLabel}
      onClick={color === 'white' ? closeModal : onClick}
    >
      {children}
    </button>
  );
};
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
Modal.Button = Button;
export default Modal;
