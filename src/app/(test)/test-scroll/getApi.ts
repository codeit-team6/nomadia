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
  cursorId?: number; // 이걸 필수로 작성해주시고~
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

//계속 get 요청에서 400에러 발생: 파라미터 불일치 문제
//const { data } = await instance.get('activities?method=cursorId', { params });
//위의 코드에서 cursorId가 아닌 cursor이어야 했음... ㅅㅂ
