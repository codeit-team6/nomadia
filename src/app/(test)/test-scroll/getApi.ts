//테스트용으로 작성한 get 호출 함수 파일입니다. 무시해주세요~

import axios from 'axios';

import { GetActListApiResponse } from '@/features/activities/libs/types/activity';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL 환경 변수가 설정되지 않았습니다.');
}
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//---------------------------------------------------------------------------------
interface GetActListApiParams {
  cursorId?: number; // 커서 항목 필수
  category?: string;
  keyword?: string;
  sort?: 'most_reviewed' | 'price_asc' | 'price_desc' | 'lastest';
  size?: number;
}

export const getApi = async (
  params?: GetActListApiParams,
): Promise<GetActListApiResponse> => {
  const { data } = await instance.get('activities?method=cursor', { params });
  return data;
};
