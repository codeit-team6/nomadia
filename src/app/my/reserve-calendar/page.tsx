'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import CalendarWithReservations from '@/shared/components/calendar/components/calendar-with-reservations';
import { MonthReservations } from '@/shared/components/calendar/libs/types/data';
import Dropdown from '@/shared/components/dropdown';

const ReserveCalendarPage = () => {
  const [reservationArray, setReservationArray] = useState<MonthReservations[]>(
    [],
  );

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // 체험 상세 예약 기능 완성 후 구현
        const data: MonthReservations[] = [];
        setReservationArray(data);
      } catch (error) {
        console.error('예약 데이터 가져오기 실패', error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-[6.8rem] flex-col gap-[1rem]">
        <h2 className="txt-18-bold text-gray-950">예약 현황</h2>
        <p className="txt-14-medium text-gray-500">
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </p>
      </div>

      <Dropdown
        trigger={
          <div className="shadow-experience-card mt-[1.8rem] flex h-[5.4rem] w-full cursor-pointer items-center justify-end rounded-[1rem] border border-gray-100 bg-white pr-[2.6rem] text-[1.4rem] text-gray-950 md:text-[1.6rem]">
            <ChevronDown className="size-[2rem]" />
          </div>
        }
        dropdownClassName="w-full bg-white shadow-lg rounded-[1rem] border border-gray-100"
      >
        <ul className="py-3">
          <p>내가 등록한 체험1</p>
          <p>내가 등록한 체험2</p>
          <p>내가 등록한 체험3</p>
        </ul>
      </Dropdown>

      <div className="flex-center flex">
        <CalendarWithReservations
          reservationArray={reservationArray}
          calendarWidth="md:w-[47.6rem] lg:w-[64rem] md:mt-[2.4rem] md:rounded-[2rem] border border-gray-50 shadow-experience-card"
        />
      </div>
    </div>
  );
};

export default ReserveCalendarPage;
