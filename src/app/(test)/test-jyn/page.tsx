'use client';
import { useState } from 'react';

import Modal from '@/shared/components/modal/modal';
import Pagination from '@/shared/components/pagination/pagination';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

export default function Page() {
  const [page, setPage] = useState(3);

  //모달 open,close 상태는 전역상태 사용
  const { openModal } = useModalStore();
  return (
    <>
      <Pagination totalPages={33} currentPage={page} setPage={setPage} />
      <button onClick={openModal}>Open Modal</button>
      {/* {isModalOpen && <Modal />} */}
      <Modal type="warning">
        <Modal.Header>
          저장되지 않았습니다
          <br />
          정말로 뒤로 가시겠습니까?
        </Modal.Header>

        <Modal.Footer>
          <Modal.Button color="white" ariaLabel="확인">
            확인
          </Modal.Button>
          <Modal.Button color="blue" ariaLabel="확인">
            확인
          </Modal.Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
