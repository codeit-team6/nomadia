'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ErrorPageProps {
  code: string;
  message: string;
}

export default function ErrorPage({ code, message }: ErrorPageProps) {
  const router = useRouter();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100vh',
        whiteSpace: 'pre-line',
      }}
    >
      <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>{code} ERROR</h1>
      <p style={{ marginTop: '10px', color: '#333', fontSize: '14px' }}>{message}</p>
      <div style={{ marginTop: '30px' }}>
        <Image
          src="/assets/sad-laptop.png"
          alt="Sad laptop"
          width={200}
          height={200}
          priority
        />
      </div>
      <button
        style={{
          marginTop: '20px',
          background: 'none',
          border: 'none',
          color: '#333',
          textDecoration: 'underline',
          cursor: 'pointer',
          fontSize: '14px',
        }}
        onClick={() => router.back()}
      >
        이전 페이지로
      </button>
    </div>
  );
}
