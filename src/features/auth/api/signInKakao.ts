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
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
  const baseUrl = `https://sp-globalnomad-api.vercel.app/${teamId}/oauth`;

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
