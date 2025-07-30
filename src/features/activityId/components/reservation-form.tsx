'use client';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import CalendarForForm from '@/shared/components/calendar/components/calendar-for-form';
import { cn } from '@/shared/libs/cn';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

import { Schedules } from '../libs/types/activityInfo';

const CALENDAR_STYLES = {
  calendarWidth: 'md:w-[35.9rem] lg:w-[35rem]',
  dayOfWeekStyle: 'md:my-[1.36rem] md:w-[5.128rem] lg:my-0 lg:w-[5rem]',
  cellStyle: 'md:my-[1.36rem] md:w-[5.128rem] lg:my-0 lg:w-[5rem]',
} as const;

const ReservationForm = ({ scheduleArray }: { scheduleArray: Schedules[] }) => {
  const { selectedDate } = useCalendarStore();

  const [schedulesInDate, setSchedulesInDate] = useState<Schedules[]>([]);

  // 해당 날짜에 해당하는 스케줄 배열 업데이트 -> 이후 시간 선택지에 사용
  // 미리 시간 선택지가 보여야 해서, 날짜 선택할때마다 업데이트 해야 함..
  useEffect(() => {
    const match = scheduleArray.filter(
      (schedule) => schedule.date === selectedDate,
    );
    setSchedulesInDate(match);
  }, [selectedDate, scheduleArray]);

  // 리액트훅폼
  const { control, handleSubmit } = useForm();

  return (
    <>
      {/* 캘린더 컴포넌트 사용 */}
      {/* 🐛 폼 제출에는 selectedDate값이 필요가 없다. 일단은 컨트롤러로 필드값을 업데이트 하고 있지만, 그냥 캘린더로만 사용해도 문제 없을거 같다. */}
      {/* 🐛 handleSubmit 제출 전에, 밸류를 Number로 형변환 체크 필요함 */}
      {/* https://sp-globalnomad-api.vercel.app/15-6/activities/5192/reservations */}
      <form onSubmit={handleSubmit((data) => console.log('제출', data))}>
        {/* 날짜 선택 캘린더(폼 제출 값에는 미반영) */}
        <span className="text-[1.8rem] font-bold text-gray-950">날짜</span>
        <CalendarForForm
          scheduleArray={scheduleArray}
          isForReservation={true}
          calendarWidth={CALENDAR_STYLES.calendarWidth}
          dayOfWeekStyle={CALENDAR_STYLES.dayOfWeekStyle}
          cellStyle={CALENDAR_STYLES.cellStyle}
        />
        {/* 참여 인원 수 */}
        <Controller
          name="headCount"
          control={control}
          defaultValue={1}
          rules={{ min: 1 }}
          render={({ field }) => {
            const value = Number(field.value);
            return (
              <>
                <label htmlFor="headCount">참여 인원 수</label>
                <div className="gap=[3rem] flex text-5xl">
                  <button
                    type="button"
                    disabled={value <= 1}
                    onClick={() => {
                      field.onChange(value - 1);
                    }}
                  >
                    -
                  </button>
                  <input
                    id="headCount"
                    {...field}
                    value={field.value}
                    readOnly
                    className="pointer-events-none cursor-default select-none focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      field.onChange(value + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </>
            );
          }}
        />
        {/* 예약 시간 선택지 */}
        {/* 만약 예약가능 선택지 없으면 "해당 날짜에 예약 가능한 시간대가 없습니다" */}
        <Controller
          name="resrvationTime"
          control={control}
          defaultValue=""
          rules={{
            validate: (value) => value !== '' || '예약 시간을 선택해 주세요',
          }}
          render={({ field }) => {
            return (
              <>
                <label htmlFor="resrvationTime">예약 가능한 시간</label>
                <div>
                  {schedulesInDate.map((schedule) => {
                    const isSelected = field.value === schedule.id;
                    return (
                      <div key={schedule.id}>
                        <button
                          type="button"
                          onClick={() => {
                            field.onChange(isSelected ? '' : schedule.id);
                          }}
                          className={cn(
                            'text-3xl text-green-500',
                            isSelected && 'text-blue-500',
                          )}
                        >
                          {schedule.startTime}~{schedule.endTime}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          }}
        />
        <button className="bg-main w-full rounded-[1.4rem] py-[1.4rem] text-[1.6rem] font-bold text-white">
          예약하기
        </button>
      </form>
    </>
  );
};
export default ReservationForm;
