'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('앱 오류:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold mb-2">앗! 문제가 발생했어요</h1>
      <p className="text-gray-500 mb-4">잠시 후 다시 시도해주세요.</p>
      <button
        onClick={() => reset()}
        className="text-blue-600 underline hover:text-blue-800"
      >
        다시 시도
      </button>
    </div>
  );
}
