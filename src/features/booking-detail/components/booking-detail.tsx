import BookingList from '@/features/booking-detail/components/booking-list';

const BookingDetail = () => {
  return (
    <div className="px-[2.4rem]">
      {/* 해당 div 영역은 추후 마이페이지에 공통 스타일로 옮겨져서 삭제예정 */}
      <div>
        <p>예약 내역</p>
        <span>예약내역 변경 및 취소할 수 있습니다.</span>
      </div>
      <BookingList />
    </div>
  );
};

export default BookingDetail;
