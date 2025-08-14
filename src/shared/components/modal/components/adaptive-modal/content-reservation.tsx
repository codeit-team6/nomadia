import React, { useEffect, useMemo, useState } from 'react';

import {
  getReserveTimeApi,
  ReservationFromApi,
} from '@/features/activities/libs/api/getReserveTimeApi';
import { updateReservationStatus } from '@/features/activities/libs/api/updateReservation';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

export type DisplayReservation = {
  id: string;
  nickname: string;
  headCount: number;
  status: 'pending' | 'confirmed' | 'declined';
  startTime: string;
  endTime: string;
};

interface ContentReservationProps {
  teamId: string;
  activityId: number;
  scheduleId: number | null;
  status: 'pending' | 'confirmed' | 'declined';
  selectedDate: string;
  onStatusChange?: (
    reservationId: string,
    newStatus: 'confirmed' | 'declined',
  ) => void;
}

export const ContentReservation: React.FC<ContentReservationProps> = ({
  teamId,
  activityId,
  scheduleId,
  status,
  selectedDate,
}) => {
  const [reservations, setReservations] = useState<DisplayReservation[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'pending' | 'confirmed' | 'declined'
  >('pending');
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (scheduleId === null || scheduleId === undefined) {
      setReservations([]);
      setSelectedTimeSlot(null);
      return;
    }

    if (
      !teamId ||
      !activityId ||
      !scheduleId ||
      !status ||
      !token ||
      !selectedDate
    )
      return;

    getReserveTimeApi(activityId, scheduleId, status)
      .then(({ reservations: resFromApi }) => {
        const mapped = resFromApi.map((r: ReservationFromApi) => ({
          id: String(r.id),
          nickname: r.nickname,
          headCount: r.headCount,
          status: r.status as 'pending' | 'confirmed' | 'declined',
          startTime: r.startTime,
          endTime: r.endTime,
        }));

        setReservations(mapped);

        // 첫 번째 시간대 기본 선택
        const slots = [
          ...new Set(mapped.map((r) => `${r.startTime} - ${r.endTime}`)),
        ];

        if (slots.length > 0) {
          setSelectedTimeSlot(slots[0]);
        }
      })
      .catch(() => {
        setReservations([]);
        setSelectedTimeSlot(null);
      });
  }, [teamId, activityId, scheduleId, status, token, selectedDate]);

  // 예약이 있는 시간대 목록
  const timeSlots = useMemo(() => {
    return [
      ...new Set(reservations.map((r) => `${r.startTime} - ${r.endTime}`)),
    ];
  }, [reservations]);

  // 선택된 시간대의 예약 내역
  const filteredReservations = useMemo(() => {
    if (!selectedTimeSlot) return [];
    return reservations.filter(
      (r) => `${r.startTime} - ${r.endTime}` === selectedTimeSlot,
    );
  }, [reservations, selectedTimeSlot]);

  // 승인 / 거절 클릭 핸들러
  const handleStatusChange = async (
    reservationId: string,
    newStatus: 'confirmed' | 'declined',
  ) => {
    if (!scheduleId) return;

    try {
      await updateReservationStatus(
        teamId,
        activityId,
        Number(reservationId),
        newStatus,
      );

      // 예약 상태 갱신
      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservationId ? { ...r, status: newStatus } : r,
        ),
      );
    } catch (error) {
      console.error(error);
      alert('예약 상태 업데이트 실패');
    }
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="txt-20-bold mb-6 text-center">{selectedDate}</h1>

      <div className="txt-14-bold mb-4 flex border-b">
        <button
          className={`flex-1 py-2 text-center ${activeTab === 'pending' ? 'border-main border-b-2' : 'text-gray-400'}`}
          onClick={() => setActiveTab('pending')}
        >
          신청{' '}
          {filteredReservations.filter((r) => r.status === 'pending').length}
        </button>
        <button
          className={`flex-1 py-2 text-center ${activeTab === 'confirmed' ? 'border-main border-b-2' : 'text-gray-400'}`}
          onClick={() => setActiveTab('confirmed')}
        >
          승인{' '}
          {filteredReservations.filter((r) => r.status === 'confirmed').length}
        </button>
        <button
          className={`flex-1 py-2 text-center ${activeTab === 'declined' ? 'border-main border-b-2' : 'text-gray-400'}`}
          onClick={() => setActiveTab('declined')}
        >
          거절{' '}
          {filteredReservations.filter((r) => r.status === 'declined').length}
        </button>
      </div>

      <div className="mb-6">
        <div className="txt-14-bold mb-1 block">예약 시간</div>
        <select
          className="w-full rounded border p-3"
          value={selectedTimeSlot ?? ''}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
        >
          {timeSlots.map((timeSlot) => (
            <option key={timeSlot} value={timeSlot}>
              {timeSlot}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="txt-14-bold mb-2 block">예약 내역</div>

        <div className="space-y-4">
          {filteredReservations
            .filter((r) => r.status === activeTab)
            .map(({ id, nickname, headCount }) => (
              <div
                key={id}
                className="flex items-center justify-between rounded border bg-gray-50 p-4"
              >
                <div>
                  <div>닉네임: {nickname}</div>
                  <div>인원: {headCount}명</div>
                </div>
                {activeTab === 'pending' && (
                  <div className="flex flex-col space-y-2">
                    <button
                      className="rounded border px-3 py-1 text-sm"
                      onClick={() => handleStatusChange(id, 'confirmed')}
                    >
                      승인하기
                    </button>
                    <button
                      className="rounded border px-3 py-1 text-sm"
                      onClick={() => handleStatusChange(id, 'declined')}
                    >
                      거절하기
                    </button>
                  </div>
                )}
              </div>
            ))}
          {filteredReservations.filter((r) => r.status === activeTab).length ===
            0 && (
            <p className="text-center text-gray-500">
              선택한 시간대에 해당 상태의 예약이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
