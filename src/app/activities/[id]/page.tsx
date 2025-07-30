'use client';

import Image from 'next/image';

import ReservationModal from '@/features/activityId/components/reservation-modal';
import Reviews from '@/features/activityId/components/reviews';
import Star from '@/features/activityId/components/star';
import SubImages from '@/features/activityId/components/sub-images';
import { pageData } from '@/features/activityId/libs/mockPageData';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

import AddressWithMap from '../../../features/activityId/components/addressWithMap';

// TODO
// 🐛 1.  calendar-for-form에서 클릭 시 id 저장하는 코드 제거하기 O
// 2. 시간까지 클릭하면, 날짜,시작시간,끝시간 일치하는 객체 찾는 로직으로 구현 X --> 어차피 날짜 선택지 표시하려면, 날짜 선택 시점에 관련 array로 filter해야함
// 3. isDesktop활용하여, 캘린더를 모달로 감싸서 사용 O
// * 예약신청 리퀘스트 형식
//    "scheduleId": 0,
//    "headCount": 0 - 참여 인원
// * mockData pageID = 5192

const ActivityPage = () => {
  // const { id } = useParams();
  // const { data } = useActivityIdQuery(id);
  const data = pageData;
  console.log('data:', data);

  const { appearModal } = useModalStore();

  const schedules = pageData.schedules;
  const images = [
    '/images/sad-laptop.svg',
    '/images/warning.svg',
    '/images/icons/logo.svg',
    // '/images/icons/fire.svg',
  ];

  return (
    <div className="flex-center flex-col p-[2.4rem]">
      <div>
        <div className="flex flex-col gap-[2rem] md:gap-[2.4rem] lg:flex-row lg:gap-[4rem]">
          <SubImages images={images} />
          <div className="relative">
            <header className="order-2 col-span-1 lg:w-[41rem]">
              <div className="mt-[2rem] flex items-start justify-between">
                <div>
                  <div className="text-[1.3rem] font-medium text-gray-700">
                    {data?.category}
                  </div>
                  <h1 className="mb-[1.6rem] text-[1.8rem] font-bold text-gray-950">
                    {data?.title}
                  </h1>
                </div>
                {/* ✨ 이거 버튼 드롭다운  붙여야함~~ */}
                <button>
                  <Image
                    src="/images/icons/more.svg"
                    width={28}
                    height={28}
                    alt={'more-options'}
                  />
                </button>
              </div>
              {/* 별점 & 후기 & 구분선 */}
              <div className="mb-[1rem] flex items-center gap-[0.6rem] text-[1.4rem] leading-none text-gray-700">
                <Star />
                <p>
                  {data?.rating}({data?.reviewCount})
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
            </header>
            <section className="absolute top-[23rem] left-0">
              <ReservationModal scheduleArray={schedules} />
            </section>
          </div>
        </div>
        <div className="lg:w-[67rem]">
          {/* ✅ info title */}
          <hr className="mt-[2rem] mb-[2rem]" />
          {/* ✅ 체험 설명 */}
          <section>
            <h2 className="text-[1.6rem] font-bold text-gray-950">체험 설명</h2>
            <p className="text-[1.6rem] font-medium text-gray-950">
              {data?.description}
            </p>
          </section>
          <hr className="mt-[2rem] mb-[2rem]" />
          {/* ✅ 오시는 길 */}
          <AddressWithMap address={data?.address} />
          {/* ✅ 체험 후기 */}
          <Reviews />

          <div className="fixed bottom-0 left-0 w-full border-t-1 bg-white p-[2.4rem] pb-[1.8rem] lg:hidden">
            <div className="flex-center">
              <button
                className="bg-main w-[32.7rem] rounded-[1.4rem] py-[1.4rem] text-[1.6rem] font-bold text-white md:w-[68.4rem] lg:w-[67rem]"
                onClick={() => appearModal()}
              >
                예약하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActivityPage;
