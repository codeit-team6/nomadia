import Image from 'next/image';
import React from 'react';

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
      {statusLabel === '예약 완료' && (
        <button
          type="button"
          className="flex-center w-full cursor-pointer gap-[0.4rem] rounded-[0.8rem] bg-gray-50 p-[1rem] text-[1.4rem] font-medium text-gray-600 hover:bg-gray-100"
        >
          예약 취소
        </button>
      )}
      <div className="mt-[3rem] h-[1px] w-full bg-gray-50" />
    </div>
  );
};

export default BookingCard;
