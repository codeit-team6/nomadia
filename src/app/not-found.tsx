'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404 ERROR</h1>
      <p className="mt-4 text-gray-600">
        존재하지 않는 주소를 입력하셨거나,<br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </p>
      <Image src="/assets/sad-laptop.png" alt="Sad laptop" width={300} height={300} />
      <button
        className="mt-6 text-blue-600 underline"
        onClick={() => router.back()}
      >
        이전 페이지로
      </button>
    </div>
  );
}
