import ReservationForm from '@/features/activityId/components/reservation-form';
import { Schedules } from '@/features/activityId/libs/types/activityDataType';
import AdaptiveModal from '@/shared/components/modal/components/adaptive-modal/adaptive-modal';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

const ReservationModal = ({
  scheduleArray,
}: {
  scheduleArray: Schedules[];
}) => {
  const { isDesktop, appearModal } = useModalStore();

  return (
    <>
      {!isDesktop && (
        <button className="bg-sub text-4xl" onClick={() => appearModal()}>
          open modal
        </button>
      )}
      {/* AdaptiveModal 사용 */}
      <AdaptiveModal extraClassName="h-[60rem] p-[2.4rem] pb-[1.8rem] md:px-[3rem] lg:p-[3rem]">
        <div className="bg-sub text-4xl text-blue-500">hahaha children</div>
        <ReservationForm scheduleArray={scheduleArray} />
      </AdaptiveModal>
      <div className="bg-amber-100 p-[10rem] text-2xl">under modal node</div>
    </>
  );
};
export default ReservationModal;
