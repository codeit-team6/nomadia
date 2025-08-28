'use client';

import { AxiosError } from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import AddressWithMap from '@/features/activityId/components/map/address-with-map';
import OwnerDropdown from '@/features/activityId/components/owner-drop-down';
import ReservationModal from '@/features/activityId/components/reservation-modal';
import Reviews from '@/features/activityId/components/reviews';
import SubImages from '@/features/activityId/components/sub-images';
import { activityIdStyle } from '@/features/activityId/libs/constants/variants';
import { useActivityIdQuery } from '@/features/activityId/libs/hooks/useActivityIdQuery';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import StarImage from '@/shared/components/star/star';
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
        {/* 체험 상세 */}
        <div>
          {/* 타이틀 헤더 */}

          <header className="flex flex-col gap-[5rem]">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[1.4rem] font-medium text-gray-700">
                    {data?.category}
                  </div>
                  <h1 className={activityIdStyle.h1}>{data?.title}</h1>
                </div>
                <OwnerDropdown ownerId={data?.userId} activityId={Number(id)} />
              </div>
              {/* 별점 & 후기 & 구분선 */}
              <div className="mb-[1rem] flex items-center gap-[0.6rem] text-[1.4rem] leading-none text-gray-700">
                <StarImage />
                <p>
                  {data?.rating.toFixed(1)} ({data?.reviewCount})
                </p>
              </div>
              <div className="flex items-center gap-[0.2rem] text-[1.4rem] leading-none text-gray-700">
                <Image
                  src="/images/icons/map-spot.svg"
                  width={16}
                  height={16}
                  alt={'address'}
                />
                <p>{data?.address}</p>
              </div>
            </div>
          </header>

          {/* 체험 상세 정보 */}
          <div className="">
            <hr className="mt-[2rem] mb-[2rem]" />
            {/* 체험 설명 */}
            <section>
              <h2 className={activityIdStyle.h2}>체험 설명</h2>
              <p className={activityIdStyle.content}>{data?.description}</p>
            </section>
            <hr className="mt-[2rem] mb-[2rem]" />
            {/* 오시는 길 */}
            <AddressWithMap address={data?.address} />
            <hr className="mb-[2rem] lg:mb-[4rem]" />
            {/* 체험 후기 */}
            <Reviews activityId={Number(id)} />
          </div>
        </div>
        {/* 체험 예약 캘린더 */}
        <ReservationModal price={data?.price} activityId={Number(id)} />
      </div>
    </div>
  );
};
export default ActivityPage;
