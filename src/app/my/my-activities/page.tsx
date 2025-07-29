import MyActivitiesCard from '@/features/my/my-activities/components/my-activities-card';

const MyExperiencePage = () => {
  return (
    <>
      <div className="mb-[2rem] flex justify-between py-[1rem] md:mb-[2.4rem]">
        <header className="flex flex-col gap-[0.4rem]">
          <h1 className="text-[1.8rem] font-bold text-gray-950">내 체험관리</h1>
          <span className="text-[1.4rem] font-medium text-gray-500">
            체험을 등록하거나 수정 및 삭제가 가능합니다.{' '}
          </span>
        </header>
        <button className="bg-main h-[4.2rem] w-[7rem] rounded-[1.2rem] font-[1.4rem] text-white">
          체험 등록하기
        </button>
      </div>

      <MyActivitiesCard />
    </>
  );
};

export default MyExperiencePage;
