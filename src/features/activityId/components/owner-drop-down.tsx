'use client';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { deleteActivities } from '@/features/my/my-activities/lib/api/myActivities.api';
import Dropdown from '@/shared/components/dropdown';
import Modal from '@/shared/components/modal/components';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';

const OwnerDropdown = ({
  ownerId,
  activityId,
}: {
  ownerId: number | undefined;
  activityId: number;
}) => {
  const { user } = useAuthStore();
  const isOwner = user?.id === ownerId;
  const { openModal, closeModal, modalName } = useModalStore();

  // delete confirm
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleConfirm = async () => {
    if (!activityId) return;
    try {
      await deleteActivities(activityId);
      toast.success('삭제가 완료되었습니다.');
      await queryClient.invalidateQueries({ queryKey: ['activities'] });
      await queryClient.invalidateQueries({ queryKey: ['myActivities'] });
      router.push('/activities');
    } catch {
      toast.error('삭제에 실패하였습니다.');
    } finally {
      closeModal();
    }
  };

  return (
    <>
      {isOwner && (
        <Dropdown
          dropdownClassName="absolute top-8 right-2"
          trigger={
            <button>
              <Image
                src="/images/icons/more.svg"
                width={28}
                height={28}
                alt={'more-options'}
                className="cursor-pointer"
              />
            </button>
          }
        >
          <div className="border-sub-300 h-[10.8rem] overflow-hidden rounded-[0.8rem] border bg-white">
            <button
              onClick={() =>
                router.push(`/my/my-activities/activity-edit/${activityId}`)
              }
              className="hover:text-main hover:bg-sub h-[5.4rem] w-[9.3rem] cursor-pointer px-[1.8rem] text-[1.6rem]"
            >
              수정하기
            </button>
            <hr />
            <button
              onClick={() => {
                openModal('delete');
              }}
              className="h-[5.4rem] w-[9.3rem] cursor-pointer px-[1.8rem] text-[1.6rem] hover:bg-red-100 hover:text-red-500"
            >
              삭제하기
            </button>
          </div>
        </Dropdown>
      )}
      {modalName === 'delete' && (
        <Modal type="warning" extraClassName="md:pb-[1rem]">
          <Modal.Header>체험을 삭제하시겠습니까?</Modal.Header>
          <div className="mb-0 flex w-[23.4rem] gap-2 md:w-[28.2rem] md:gap-3">
            <Modal.Button color="white" ariaLabel="아니요" onClick={closeModal}>
              아니요
            </Modal.Button>
            <Modal.Button color="blue" ariaLabel="네" onClick={handleConfirm}>
              네
            </Modal.Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default OwnerDropdown;
