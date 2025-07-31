import Link from 'next/link';

const MyExperiencePage = () => {
  return (
    <div>
      <div className="mb-[2.4rem]">
        <span className="text-[1.8rem] font-bold text-gray-950">
          내 체험 관리
        </span>
      </div>
      <div className="mb-[2rem] bg-red-500 p-[2rem]">내 체험 관리 페이지</div>
      <Link
        href="/my/my-activities/activity-registration"
        className="bg-main inline-block rounded-[0.8rem] px-[2rem] py-[1rem] text-[1.6rem] font-medium text-black"
      >
        체험 등록하기
      </Link>
    </div>
  );
};

export default MyExperiencePage;
