'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function Error() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center space-y-24">
      <h1
        className="text-center text-[4rem] md: text-[5rem] text-gray-700"
        style={{ fontFamily: "'Pretendard Variable', sans-serif" }}
      >
        404 ERROR
      </h1>


      <div className="text-gray-700 text-lg leading-loose">
        <p className="mb-4">죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
        <p>존재하지 않는 주소를 입력하셨거나,<br />요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
      </div>

      <Image
        src={sadLaptop}
        alt="Sad laptop"
        width={300}
        height={300}
        className="w-[70%] max-w-sm md:max-w-md"
      />

      <button
        onClick={() => router.back()}
        className="text-sm underline text-gray-700 hover:text-black"
      >
        이전 페이지로
      </button>
    </div>
  );
}
