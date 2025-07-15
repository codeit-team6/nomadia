import ErrorPage from '@/components/ErrorPage';

export default function ErrorCodePage({ params }: { params: { code: string } }) {
  const { code } = params;

  const messages: Record<string, string> = {
    '403': `접근 권한이 없습니다.\n오류의 가장 일반적인 사유 중에 하나가 바로 잘못된 URL 입력입니다.`,
    '404': `죄송합니다. 요청하신 페이지를 찾을 수 없습니다.\n존재하지 않는 주소를 입력하셨거나,\n요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.`,
    '500': `웹 애플리케이션 코드의 버그, 서버의 잘못된 구성, 데이터베이스 연결\n서버 오류가 발생했습니다.`,
  };

  const message = messages[code] ?? '알 수 없는 오류가 발생했습니다.';

  return <ErrorPage code={code} message={message} />;
}

