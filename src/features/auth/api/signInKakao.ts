import axios, { AxiosError } from 'axios';

interface KakaoSignInResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    nickname: string;
  };
}

export const signInWithKakao = async (
  token: string,
  redirectUri: string,
): Promise<KakaoSignInResponse> => {
  if (!token || !redirectUri) {
    throw new Error('토큰과 리다이렉트 URI는 필수입니다.');
  }

  const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
  const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${teamId}/oauth`;

  try {
    const res = await axios.post<KakaoSignInResponse>(
      `${baseUrl}/sign-in/kakao`,
      {
        token,
        redirectUri,
      },
    );

    return res.data;
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 404) {
      await axios.post(`${baseUrl}/sign-up/kakao`, {
        token,
        redirectUri,
      });

      const res = await axios.post<KakaoSignInResponse>(
        `${baseUrl}/sign-in/kakao`,
        {
          token,
          redirectUri,
        },
      );

      return res.data;
    }

    throw new Error('카카오 로그인 실패');
  }
};
