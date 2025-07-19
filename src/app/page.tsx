<<<<<<< HEAD
'use client';

import LandingPage from '@/features/landing/landing-page';

export default function Page() {
  return (
    <main>
      <LandingPage />
    </main>
=======
import { notFound } from 'next/navigation';


type Props = {
  params: { id: string };
};

export default async function ProductPage({ params }: Props) {
  const res = await fetch(`https://sp-globalnomad-api.vercel.app/products/${params.id}`);

  if (!res.ok) {
    notFound(); // this triggers not-found.tsx
  }

  const product = await res.json();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="mt-2 text-gray-600">{product.description}</p>
    </div>
>>>>>>> a8f6d3f ([✨ Feat] 에러 페이지)
  );
}
