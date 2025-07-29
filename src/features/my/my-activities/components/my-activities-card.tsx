import Image from 'next/image';

const MyActivitiesCard = () => {
  return (
    <article className="shadow-experience-card flex justify-between rounded-[1.2rem] bg-white p-[2.4rem] lg:items-center lg:p-[3rem]">
      {/* 왼쪽 텍스트 영역 */}
      <div className="flex flex-col">
        <div className="mb-[1.2rem] lg:mb-[2rem]">
          <h1 className="mb-[0.6rem] text-[1.6rem] font-bold text-gray-950 lg:mb-[0.8rem]">
            제목
          </h1>
          <p className="mb-[1rem] text-[1.3rem] font-medium text-gray-500 lg:mb-[1.2rem]">
            별점
          </p>
          <div className="flex gap-[0.4rem]">
            <p className="text-[1.6rem] font-bold text-gray-950">10000</p>
            <p className="text-[1.4rem] font-medium text-gray-400">/ 인</p>
          </div>
        </div>
        <div className="flex gap-[0.8rem]">
          <button className="h-[2.9rem] w-[6.8rem] rounded-[0.8rem] border border-gray-50 font-[1.4rem] font-bold text-gray-600">
            수정하기
          </button>
          <button className="h-[2.9rem] w-[6.8rem] rounded-[0.8rem] bg-gray-50 font-[1.4rem] font-bold text-gray-600">
            삭제하기
          </button>
        </div>
      </div>
      {/* 오른쪽 이미지 영역 */}
      <figure>
        <Image
          src={'/images/experiences/exp_3.png'}
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
