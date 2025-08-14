'use client';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { getActListApi } from '@/features/activities/libs/api/getActListApi';
import { getReservations } from '@/features/activities/libs/api/getReserveDayApi';
import { getReservationsByMonthApi } from '@/features/activities/libs/api/getReserveMonthApi';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import CalendarWithReservations from '@/shared/components/calendar/components/calendar-with-reservations';
import { MonthReservations } from '@/shared/components/calendar/libs/types/data';
import Dropdown from '@/shared/components/dropdown';
import AdaptiveModal from '@/shared/components/modal/components/adaptive-modal/adaptive-modal';
import { ContentReservation } from '@/shared/components/modal/components/adaptive-modal/content-reservation';
import EmptyReservation from '@/shared/components/modal/components/adaptive-modal/empty-reservation';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';
import { useModalStore } from '@/shared/libs/stores/useModalStore';
import { Activity } from '@/shared/types/activity';

const ReserveCalendarPage = () => {
  const [reservationArray, setReservationArray] = useState<MonthReservations[]>(
    [],
  );
  const { user } = useAuthStore();
  const userId = user?.id;
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivityTitle, setSelectedActivityTitle] =
    useState<string>('내가 등록한 체험 선택');
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null,
  );
  const [shouldFetch, setShouldFetch] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );

  const { setModalType, appearModal, disappearModal, isDesktop } =
    useModalStore();
  const { month, setYear, setMonth } = useCalendarStore();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (selectedActivityId) {
      setModalType('custom');
      if (isDesktop) appearModal();
    } else {
      disappearModal();
    }
  }, [
    selectedActivityId,
    isDesktop,
    setModalType,
    appearModal,
    disappearModal,
  ]);

  const handleDropdownOpen = () => {
    setShouldFetch(true);
  };

  const handleDateClick = async (dateStr: string) => {
    setSelectedDate(dateStr);

    if (!selectedActivityId || !accessToken) {
      console.warn('[⚠️] activityId 또는 토큰 없음');
      setSelectedScheduleId(null);
      return;
    }

    try {
      console.log('[📡] 날짜별 예약 스케줄 조회 API 호출 시작', {
        actId: selectedActivityId,
        date: dateStr,
      });

      const res = await getReservations({
        actId: selectedActivityId,
        date: dateStr,
        token: accessToken,
      });

      console.log('[✅] 예약 스케줄 API 응답:', res);

      // 서버 응답에서 scheduleId 찾기
      const scheduleIdFromApi = res?.[0]?.scheduleId ?? null;
      if (scheduleIdFromApi) {
        console.log('[🗓️] scheduleId 추출 성공:', scheduleIdFromApi);
        setSelectedScheduleId(scheduleIdFromApi);
      } else {
        console.warn('[⚠️] 해당 날짜에 scheduleId 없음');
        setSelectedScheduleId(null);
      }
    } catch (err) {
      console.error('[❌] 예약 스케줄 조회 실패:', err);
      setSelectedScheduleId(null);
    }

    appearModal();
  };

  useEffect(() => {
    if (!shouldFetch || !userId) return;

    (async () => {
      try {
        const data = await getActListApi();
        const myActivities = (data.activities || []).filter(
          (act) => act.userId === Number(userId),
        );
        setActivities(myActivities);
      } catch (error) {
        console.error('내 체험 리스트 조회 실패', error);
      }
      setShouldFetch(false);
    })();
  }, [shouldFetch, userId]);

  const handleSelectActivity = async (id: string | number, title: string) => {
    setSelectedActivityTitle(title);
    const activityId = String(id);
    setSelectedActivityId(activityId);
    setSelectedDate(null);
    setSelectedScheduleId(null);

    try {
      const currentYear = new Date().getFullYear();
      const monthsToFetch = 12;
      let earliestDate: Date | null = null;
      let allReservations: MonthReservations[] = [];

      for (let i = 0; i < monthsToFetch; i++) {
        const fetchYear = currentYear + Math.floor((month + i) / 12);
        const fetchMonth = (month + i) % 12;

        const reservations = await getReservationsByMonthApi({
          activityId,
          year: fetchYear,
          month: fetchMonth + 1,
        });

        allReservations = [...allReservations, ...reservations];

        for (const r of reservations) {
          const resDate = new Date(r.date);
          if (!earliestDate || resDate < earliestDate) earliestDate = resDate;
        }

        if (earliestDate) break;
      }

      setReservationArray(allReservations);

      if (earliestDate) {
        setYear(earliestDate.getFullYear());
        setMonth(earliestDate.getMonth());
      }
    } catch (error) {
      console.error('예약 데이터 조회 실패', error);
      setReservationArray([]);
    }
  };

  const updateReservationStatus = (
    reservationId: string,
    newStatus: 'confirmed' | 'declined',
  ) => {
    setReservationArray((prev) =>
      prev.map((res) =>
        res.id === reservationId ? { ...res, status: newStatus } : res,
      ),
    );
  };

  const selectedReservationsOfDate = React.useMemo(() => {
    if (!selectedDate) return [];
    return reservationArray.filter((res) => {
      const rDateStr = res.date.split('T')[0];
      return rDateStr === selectedDate;
    });
  }, [selectedDate, reservationArray]);

  return (
    <div className="flex flex-col items-start">
      <div className="mb-[2.4rem] w-full">
        <h2 className="txt-18-bold text-gray-950">예약 현황</h2>
        <p className="txt-14-medium mt-1 text-gray-500">
          내 체험의 내역들을 한 눈에 확인할 수 있습니다.
        </p>

        <div className="mt-[1.8rem] md:w-[47.6rem] lg:w-[64rem]">
          <Dropdown
            trigger={
              <div
                role="button"
                tabIndex={0}
                onClick={handleDropdownOpen}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleDropdownOpen();
                }}
                className="shadow-experience-card flex h-[5.4rem] w-full cursor-pointer items-center justify-end rounded-[1rem] border border-gray-100 bg-white pr-[2.6rem] text-[1.4rem] text-gray-950 md:text-[1.6rem]"
              >
                <span className="mr-auto pl-[2.6rem]">
                  {selectedActivityTitle}
                </span>
                <ChevronDown className="size-[2rem]" />
              </div>
            }
            dropdownClassName="w-full bg-white shadow-experience-card rounded-[1rem] border border-gray-100 px-[2.6rem]"
          >
            {(close) => (
              <ul className="py-3">
                {activities.length === 0 && <p>등록한 체험이 없습니다.</p>}
                {activities.map((act) => (
                  <button
                    key={act.id}
                    className="block w-full cursor-pointer py-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      handleSelectActivity(act.id, act.title);
                      close();
                    }}
                  >
                    {act.title}
                  </button>
                ))}
              </ul>
            )}
          </Dropdown>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="md:w-[47.6rem] lg:w-[64rem]">
          {selectedActivityId ? (
            <CalendarWithReservations
              reservationArray={reservationArray}
              calendarWidth="w-full md:rounded-[2rem] border border-gray-50 shadow-experience-card"
              dayOfWeekStyle="w-[5.35rem] md:w-[6.8rem] lg:w-[9.143rem]"
              onCellClick={handleDateClick}
            />
          ) : (
            <div className="mt-24 flex flex-col items-center justify-center">
              <Image
                src="/images/sad-laptop.svg"
                alt="Sad laptop"
                width={246}
                height={200}
              />
              <p className="mt-14 text-[1.8rem] font-medium text-gray-600">
                등록한 체험을 선택해주세요.
              </p>
            </div>
          )}
        </div>

        {selectedActivityId && (
          <AdaptiveModal extraClassName="w-[37.5rem] h-[50.8rem] md:w-[74.4rem] md:h-[39.7rem] lg:w-[34rem] lg:h-[51.9rem] border border-gray-50 shadow-experience-card">
            <div className="p-4">
              {selectedReservationsOfDate.length > 0 ? (
                <ContentReservation
                  teamId="15-6"
                  activityId={Number(selectedActivityId)}
                  scheduleId={selectedScheduleId}
                  status={'pending'}
                  selectedDate={selectedDate || ''}
                  onStatusChange={updateReservationStatus}
                />
              ) : (
                <EmptyReservation />
              )}
            </div>
          </AdaptiveModal>
        )}
      </div>
    </div>
  );
};

export default ReserveCalendarPage;
