'use server';

export async function registerKakaoApp(teamId: string, appKey: string) {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) throw new Error('API_BASE_URL이 설정되지 않았습니다.');

  const response = await fetch(`${baseUrl}/oauth/apps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      provider: 'kakao',
      appKey,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '앱 등록 실패');
  }

  return response.json();
}
