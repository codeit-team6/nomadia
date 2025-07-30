import ReservationForm from '@/features/activityId/components/reservation-form';
import AdaptiveModal from '@/shared/components/modal/components/adaptive-modal/adaptive-modal';

import { Schedules } from '../libs/types/activityInfo';

const ReservationModal = ({
  scheduleArray,
}: {
  scheduleArray: Schedules[];
}) => {
  return (
    <>
      {/* AdaptiveModal 사용 */}
      <AdaptiveModal extraClassName="h-[60rem] p-[2.4rem] pb-[1.8rem] md:px-[3rem] lg:p-[3rem]">
        <ReservationForm scheduleArray={scheduleArray} />
      </AdaptiveModal>
    </>
  );
};
export default ReservationModal;
