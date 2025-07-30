import ReservationForm from '@/features/activityId/components/reservation-form';
import AdaptiveModal from '@/shared/components/modal/components/adaptive-modal/adaptive-modal';

import { Schedules } from '../libs/types/activityInfo';

const ReservationModal = ({
  scheduleArray,
  price,
}: {
  scheduleArray: Schedules[];
  price: number;
}) => {
  return (
    <>
      {/* AdaptiveModal 사용 */}
      <AdaptiveModal
        extraClassName="h-fit p-0"
        translateY={'translate-y-[calc(100%-124px)]'}
      >
        <ReservationForm scheduleArray={scheduleArray} price={price} />
      </AdaptiveModal>
    </>
  );
};
export default ReservationModal;
