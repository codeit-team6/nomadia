'use client';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Schedules } from '@/features/activityId/libs/types/activityDataType';
import CalendarForForm from '@/shared/components/calendar/components/calendar-for-form';
import { cn } from '@/shared/libs/cn';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

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

  // for test...
  // const watchDate = watch('selectedDate');
  // const watchCount = watch('headCount');
  // const watchID = watch('resrvationTime');

  return (
    <>
      {/*for test...
      <div className="text-3xl">✅{watchDate}</div>
      <div className="text-3xl">✅{watchCount}</div>
      <div className="text-3xl">watchId: ✅{watchID}</div> */}

      {/* 캘린더 컴포넌트 사용 */}
      {/* 🐛 폼 제출에는 selectedDate값이 필요가 없다. 일단은 컨트롤러로 필드값을 업데이트 하고 있지만, 그냥 캘린더로만 사용해도 문제 없을거 같다. */}
      <form onSubmit={handleSubmit((data) => console.log('제출', data))}>
        <Controller
          name="selectedDate"
          control={control}
          defaultValue=""
          rules={{
            validate: (value) => value !== '' || '날짜를 선택해주세요',
          }}
          render={({ field }) => {
            return (
              <>
                <label htmlFor="selectedDate">날짜</label>
                <CalendarForForm
                  scheduleArray={scheduleArray}
                  isForReservation={true}
                  calendarWidth={CALENDAR_STYLES.calendarWidth}
                  dayOfWeekStyle={CALENDAR_STYLES.dayOfWeekStyle}
                  cellStyle={CALENDAR_STYLES.cellStyle}
                  changeFormValue={() =>
                    field.onChange(
                      field.value === selectedDate ? '' : selectedDate,
                    )
                  } // 🐛 selectedDate값을 확인하고(이거 업데이트 이후에), 폼 값을 업데이트하는데, 상태 리렌더링이 한박자 밀림.
                  // 밑에 시간 스케줄은 정확하게 뜨는것도 아이러니
                  // 시도1. selectedDate의 최신(현재값) 사용하는거 시도해보기(getState()로 가져올수 있음)
                  // -> console.log('currnet:', useCalendarStore.getState().selectedDate);
                  // console.log('selected:', selectedDate); //둘다 클릭 시점에 현재값을 잘 반영하고 있음
                  // 소용 없음.. 나중에, 주스탄드,여기,캘린더컴포넌트 내부에 다 콘솔 찍어서 업데이트 순서 확인해봐야 알수있을듯
                />
              </>
            );
          }}
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
        <button className="bg-main text-[1.6rem] font-bold">예약하기</button>
      </form>
    </>
  );
};
export default ReservationForm;
