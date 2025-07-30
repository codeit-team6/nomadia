import Image from 'next/image';

import { useModalStore } from '@/shared/libs/stores/useModalStore';
import { formatPrice } from '@/shared/libs/utils/formatPrice';

import { MyActivitiesCardProps } from '../lib/types/types';
const MyActivitiesCard = ({ activity }: MyActivitiesCardProps) => {
  const { openModal } = useModalStore();
  const handleDelete = () => {
    openModal(activity.id);
  };
  return (
    <article className="shadow-experience-card mb-[3rem] flex justify-between rounded-[2.4rem] bg-white p-[2.4rem] lg:mb-[2.4rem] lg:items-center lg:p-[3rem]">
      {/* 왼쪽 텍스트 영역 */}
      <div className="flex flex-col">
        <div className="mb-[1.2rem] lg:mb-[2rem]">
          {/* 타이틀 */}
          <h1 className="mb-[0.6rem] line-clamp-1 text-[1.6rem] font-bold text-gray-950 lg:mb-[0.8rem]">
            {activity.title}
          </h1>
          {/* 별점 */}
          <p className="mb-[1rem] text-[1.3rem] font-medium text-gray-500 lg:mb-[1.2rem]">
            {activity.rating}
          </p>
          {/* 가격 */}
          <div className="flex gap-[0.4rem]">
            <p className="text-[1.6rem] font-bold text-gray-950">
              {`₩${formatPrice(activity.price)}`}
            </p>
            <p className="text-[1.4rem] font-medium text-gray-400">/ 인</p>
          </div>
        </div>
        <div className="flex gap-[0.8rem]">
          <button className="h-[2.9rem] w-[6.8rem] cursor-pointer rounded-[0.8rem] border border-gray-50 text-[1.4rem] font-bold text-gray-600 transition-colors hover:bg-gray-100">
            수정하기
          </button>
          <button
            className="h-[2.9rem] w-[6.8rem] cursor-pointer rounded-[0.8rem] bg-gray-50 text-[1.4rem] font-bold text-gray-600 transition-colors hover:bg-gray-200 hover:text-red-400"
            onClick={handleDelete}
          >
            삭제하기
          </button>
        </div>
      </div>
      {/* 오른쪽 이미지 영역 */}
      <figure className="ml-[2.2rem] flex-shrink-0">
        <Image
          src={`${activity.bannerImageUrl}`}
          alt=""
          width={82}
          height={82}
          className="aspect-square rounded-[2rem] object-cover lg:w-[14.2rem]"
        />
      </figure>
    </article>
  );
};

export default MyActivitiesCard;
