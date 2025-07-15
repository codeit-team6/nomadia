'use client';

import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import sadLaptop from '@/assets/sad-laptop.png';

export default function ErrorCodePage() {
  const router = useRouter();
  const params = useParams(); 
  const code = params?.code as string;

  const messages: Record<string, string> = {
    '403': '접근 권한이 없습니다. 오류의 가장 일반적인 사유 중에 하나가 바로 잘못된 URL 입력입니다.',
    '404': '죄송합니다. 요청하신 페이지를 찾을 수 없습니다.\n존재하지 않는 주소를 입력하셨거나,\n요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.',
    '500': '웹 애플리케이션 코드의 버그, 서버의 잘못된 구성, 데이터베이스 연결 서버 오류가 발생했습니다.',

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800">{code} ERROR</h1>
      <p className="mt-4 text-gray-600">{messages[code] || '알 수 없는 오류입니다.'}</p>
      <Image src={sadLaptop} alt="Sad laptop" width={300} height={300} className="my-6" />
      <button
        onClick={() => router.back()}
        className="text-sm underline text-gray-700 hover:text-black"
      >
        이전 페이지로
      </button>
    </div>
  );
}
