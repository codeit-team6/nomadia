import { BOOKING_STATUS } from '@/features/booking-detail/libs/constants/bookingStatus';
import { Button } from '@/shared/libs/shadcn/components/ui/button';

// TODO: 예약 상세 필터 버튼 컴포넌트 추가 (예약 상세 페이지 내 필터 버튼)
const FilterButtons = () => {
  return (
    <div className="category-scroll mx-[2.4rem] mb-[2.4rem] flex flex-nowrap gap-[0.8rem] overflow-x-auto whitespace-nowrap">
      {BOOKING_STATUS.map(({ label, value }) => (
        <Button key={label} size="sm" className="group">
          {label} {value}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;
