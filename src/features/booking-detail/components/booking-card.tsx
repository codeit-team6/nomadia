import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';

import StarRating from '@/features/booking-detail/components/star-rating';
import { useCancelMutation } from '@/features/booking-detail/libs/hooks/useCancelMutation';
import { usePostReviewMutation } from '@/features/booking-detail/libs/hooks/usePostReviewMutation';
import Modal from '@/shared/components/modal/components';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

import {
  BOOKING_STATUS,
  STATUS_COLOR_MAP,
} from '../libs/constants/bookingStatus';
import { Reservation } from '../libs/types/booking';

// 예약 카드에 필요한 데이터 타입 정의
interface BookingCardProps {
  reservation: Reservation;
}

// 상태 라벨 반환 함수
const getStatusLabel = (status: string) => {
  return BOOKING_STATUS.find((s) => s.value === status)?.label || status;
};

// 상태 색상 클래스 반환 함수
const getStatusColorClass = (status: string) => {
  return STATUS_COLOR_MAP[status];
};

/**
 * 예약 상세 카드 컴포넌트
 * @param props BookingCardProps
 */
const BookingCard = ({ reservation }: BookingCardProps) => {
  // 상태 라벨 및 색상, 시간 등 파생 데이터는 내부에서 계산
  const statusLabel = getStatusLabel(reservation.status);
  const statusColorClass = getStatusColorClass(reservation.status);
  const title = reservation.activity.title;
  const time = `${reservation.startTime} - ${reservation.endTime}`;
  const price = reservation.totalPrice;
  const peopleCount = reservation.headCount;
  const imageUrl = reservation.activity.bannerImageUrl;
  const date = reservation.date;

  const { isModalOpen, activeReservationId, openModal, closeModal } =
    useModalStore();

  // 현재 카드의 모달인지 확인
  // activeReservationId가 없으면 기존처럼 모든 카드에서 모달이 열림 (기존 호환성 유지)
  const isCurrentCardModal =
    isModalOpen &&
    (activeReservationId === undefined ||
      activeReservationId === reservation.id);

  // 예약 취소 버튼 클릭 시 현재 예약 ID와 함께 모달 열기
  const handleCancelClick = () => {
    openModal(reservation.id); // 예약 ID를 전달
  };

  // 예약 취소 모달에서 확인 버튼 클릭 시
  const handleModalCancelBooking = () => {
    // activeReservationId가 있으면 그것을 사용하고, 없으면 현재 카드의 ID 사용
    const targetReservationId = activeReservationId || reservation.id;
    cancelBooking(targetReservationId);
    closeModal();
  };

  // 리뷰 작성 모달에서 작성하기 버튼 클릭 시
  const handleModalPostReview = () => {
    if (reviewRating === 0) {
      toast.error('별점을 선택해주세요.');
      return;
    }

    const targetReservationId = activeReservationId || reservation.id;
    postReview({
      reservationId: targetReservationId,
      rating: reviewRating,
      content: review,
    });
    closeModal();
  };

  // 예약 취소 mutation
  const { mutate: cancelBooking, isPending } = useCancelMutation();

  // 리뷰 작성 mutation
  const { mutate: postReview, isPending: isPostingReview } =
    usePostReviewMutation();

  // 리뷰 입력 상태 관리 (textarea)
  const [review, setReview] = useState('');
  const maxLength = 100;

  // 리뷰 입력 핸들러
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setReview(e.target.value);
    }
  };

  const [reviewRating, setReviewRating] = useState(0);

  return (
    <div className="flex flex-col gap-[1.2rem]">
      <div className="text-[1.6rem] font-bold text-gray-800 md:text-[1.8rem]">
        {date}
      </div>

      <div className="relative h-[13.6rem] w-full overflow-hidden rounded-[2.4rem] md:h-[14rem]">
        {/* 배경 이미지 */}
        <div className="absolute top-0 right-0 h-full w-[13.6rem] md:w-[14rem]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            quality={90}
            loading="lazy"
            className="size-[13.6rem] object-cover md:size-[14rem]"
          />
        </div>

        {/* 흰색 카드 */}
        <div className="relative flex h-full w-[70%] flex-col justify-between gap-[0.8rem] rounded-[2.4rem] bg-white px-[2.2rem] py-[2rem] md:w-[80%]">
          {/* 상단 정보 영역 */}
          <div className="mb-[0.2rem] flex w-full flex-col">
            {/* 상태 뱃지 */}
            <span
              className={`flex-center mb-[0.5rem] w-[7rem] gap-[0.8rem] rounded-full px-[0.8rem] py-[0.4rem] text-[1.3rem] font-bold ${statusColorClass}`}
            >
              {statusLabel}
            </span>

            {/* 타이틀 */}
            <div className="text-[1.4rem] font-bold text-gray-950 lg:text-[1.8rem]">
              {title}
            </div>
            {/* 시간 */}
            <div className="text-[1.3rem] font-medium text-gray-500 lg:text-[1.6rem]">
              {time}
            </div>
          </div>
          {/* 가격/인원 영역 */}
          <div className="flex items-center gap-[0.4rem]">
            <span className="text-[1.6rem] font-bold text-gray-950 lg:text-[1.8rem]">
              ₩{price.toLocaleString()}
            </span>
            <span className="text-[1.4rem] font-medium text-gray-400 lg:text-[1.6rem]">
              {peopleCount}명
            </span>
          </div>
        </div>
      </div>

      {statusLabel === '예약 신청' && (
        <button
          type="button"
          className="flex-center w-full cursor-pointer gap-[0.4rem] rounded-[0.8rem] bg-gray-50 p-[1rem] text-[1.4rem] font-medium text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleCancelClick}
        >
          예약 취소
        </button>
      )}

      {statusLabel === '체험 완료' && !reservation.reviewSubmitted && (
        <button
          type="button"
          className="flex-center bg-main w-full cursor-pointer gap-[0.4rem] rounded-[0.8rem] p-[1rem] text-[1.4rem] font-medium text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleCancelClick}
        >
          후기 작성
        </button>
      )}

      {statusLabel === '체험 완료' && reservation.reviewSubmitted && (
        <div className="flex-center w-full gap-[0.4rem] rounded-[0.8rem] bg-gray-50 p-[1rem] text-[1.4rem] font-medium text-gray-600">
          후기 작성 완료
        </div>
      )}

      <div className="mt-[3rem] h-[1px] w-full bg-gray-50" />

      {isCurrentCardModal && (
        <Modal
          type={statusLabel === '예약 신청' ? 'warning' : 'custom'}
          extraClassName={
            statusLabel === '체험 완료' ? 'w-full h-[47.9rem] mx-[2.4rem]' : ''
          }
        >
          {statusLabel === '예약 신청' ? (
            <>
              <Modal.Header>예약을 취소하시겠어요?</Modal.Header>
              <div className="flex gap-[0.8rem] md:gap-[1.2rem]">
                <Modal.Button
                  color="white"
                  ariaLabel="취소"
                  onClick={closeModal}
                >
                  아니오
                </Modal.Button>
                <Modal.Button
                  color="blue"
                  ariaLabel="확인"
                  onClick={handleModalCancelBooking}
                >
                  {isPending ? '처리 중...' : '취소하기'}
                </Modal.Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-end">
                <X
                  className="text-gray-850 size-[2rem] cursor-pointer"
                  onClick={closeModal}
                />
              </div>
              <div className="flex-center mb-[2rem] flex-col gap-[0.6rem]">
                <p className="text-[1.6rem] font-bold text-gray-950 md:text-[1.8rem]">
                  {title}
                </p>
                <p className="text-[1.3rem] font-medium text-gray-500 md:text-[1.4rem]">
                  {`${date} / ${time}`}
                </p>
                <StarRating onRatingChange={setReviewRating} />
              </div>
              <div className="flex flex-col gap-[0.8rem]">
                <Modal.Header>
                  <span className="text-[1.8rem] font-bold text-gray-950">
                    소중한 경험을 들려주세요
                  </span>
                </Modal.Header>
                <div className="mb-[1rem] flex w-full flex-col gap-[0.8rem]">
                  <textarea
                    className="focus:border-main shadow-experience-card h-[17.9rem] w-full resize-none rounded-[1.2rem] border border-gray-200 bg-white p-[2rem] text-[1.6rem] text-gray-800 outline-none placeholder:text-gray-400"
                    placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
                    value={review}
                    onChange={handleReviewChange}
                    maxLength={maxLength}
                  ></textarea>
                  <span className="text-right text-[1.3rem] font-medium text-gray-600 md:text-[1.4rem]">
                    {review.length}/{maxLength}
                  </span>
                </div>
              </div>
              <div>
                <Modal.Button
                  color="blue"
                  ariaLabel="작성하기 버튼"
                  onClick={isPostingReview ? undefined : handleModalPostReview}
                >
                  {isPostingReview ? '작성 중...' : '작성하기'}
                </Modal.Button>
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

export default BookingCard;
