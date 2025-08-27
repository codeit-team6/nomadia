'use client';

import { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Header from '@/features/activityId/components/header';
import AddressWithMap from '@/features/activityId/components/map/address-with-map';
import ReservationModal from '@/features/activityId/components/reservation-modal';
import Reviews from '@/features/activityId/components/reviews';
import SubImages from '@/features/activityId/components/sub-images';
import { textStyle } from '@/features/activityId/libs/constants/variants';
import { useActivityIdQuery } from '@/features/activityId/libs/hooks/useActivityIdQuery';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import { cn } from '@/shared/libs/cn';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';

const ActivityPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useActivityIdQuery(id);
  const { isDesktop } = useWindowSize();
  const router = useRouter();
  if (isError) {
    if (error instanceof AxiosError && error.response) {
      const status = error.response.status;

      if (status === 404 || status === 500) {
        router.push('/not-found');
      } else {
        throw new Error(String(status));
      }
    }
  }

  // 언마운트 시 클린업
  const { closeModal } = useModalStore();
  useEffect(() => {
    return () => {
      closeModal();
    };
  }, [closeModal]);

  if (isLoading || !data) return <LoadingSpinner />;

  return (
    <div className="mx-auto w-full justify-center p-[2.4rem] md:px-[4rem] lg:max-w-[120rem] lg:pt-[1.6rem]">
      {/* 체험 이미지 */}
      <SubImages images={data?.subImages} />
      <div
        className={cn(isDesktop && 'grid grid-cols-[1fr_41.9rem] gap-[4rem]')}
      >
        <div>
          {/* 헤더 영역(분류, 제목, 별점, 주소, 드롭다운) */}
          <Header data={data} />
          {/* 체험 설명 */}
          <hr className="mt-[2rem] mb-[2rem]" />
          <section>
            <h2 className={textStyle.h2}>체험 설명</h2>
            <p className={textStyle.content}>{data?.description}</p>
          </section>
          {/* 오시는 길 */}
          <hr className="mt-[2rem] mb-[2rem]" />
          <AddressWithMap address={data?.address} />
          {/* 체험 후기 */}
          <hr className="mb-[2rem] lg:mb-[4rem]" />
          <Reviews activityId={Number(id)} />
        </div>
        {/* 체험 예약 캘린더 */}
        <ReservationModal price={data?.price} activityId={Number(id)} />
      </div>
    </div>
  );
};
export default ActivityPage;
