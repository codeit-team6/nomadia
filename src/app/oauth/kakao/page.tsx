'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { registerKakaoApp } from '@/features/auth/api/oauthApp';
import { signInWithKakao } from '@/features/auth/api/signInKakao';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';

const KakaoCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const appKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const teamId = '15-6';

  const doLogin = useAuthStore((state) => state.login);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!code || !redirectUri || !appKey) {
      setHasError(true);
      return;
    }

    const login = async () => {
      try {
        try {
          await registerKakaoApp(teamId, appKey);
        } catch (err: unknown) {
          let message = '';

          if (err instanceof Error) {
            message = err.message;
          }

          const alreadyExists = message?.includes('이미 등록된');
          const isConflictOrBadRequest =
            message?.includes('409') || message?.includes('400');

          if (!alreadyExists && !isConflictOrBadRequest) {
            throw err;
          }
        }

        const data = await signInWithKakao(code, redirectUri);

        doLogin({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        router.replace('/activities');
        return;
      } catch (error) {
        console.error('카카오 로그인 에러', error);
        setHasError(true);
        router.push('/login');
        return;
      }
    };

    login();
  }, [code, redirectUri, appKey, teamId, router, doLogin]);

  if (hasError) {
    return (
      <div className="mt-20 text-center">처리 중 문제가 발생했습니다.</div>
    );
  }

  return <LoadingSpinner />;
};

export default KakaoCallbackPage;
