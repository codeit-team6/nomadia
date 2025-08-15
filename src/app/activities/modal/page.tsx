'use client';
import Modal from '@/shared/components/modal/components';
import AdaptiveModal from '@/shared/components/modal/components/adaptive-modal/adaptive-modal';
import { useModalStore as useModaldal } from '@/shared/components/modal/libs/stores/useModalStore';

export default function Page() {
  const { openModal, appearModal } = useModaldal();

  return (
    <>
      <button
        onClick={() => {
          openModal();
          console.log('clickeee');
        }}
        className="text-3xl"
      >
        open modal
      </button>
      <button
        onClick={() => {
          appearModal();
          console.log('dddd');
        }}
        className="text-3xl"
      >
        open adaptive
      </button>
      <Modal type="warning">
        <Modal.Header>hahahah my name is...</Modal.Header>
        <Modal.Button color="white" ariaLabel="helo">
          button
        </Modal.Button>
      </Modal>
      <AdaptiveModal translateY={'translate-y-[calc(100%-132px)]'}>
        칠드런
        <div className="size-72 bg-amber-300 text-5xl">ahahahahahahah</div>
      </AdaptiveModal>
    </>
  );
}
