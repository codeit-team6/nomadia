'use client';

import LandingPage from '@/features/landing/landing-page';
import Header from '@/shared/components/header';
import Footer from '@/shared/components/footer';

export default function Page() {
  return (
    <main>
      <Header />
      <LandingPage />
      <Footer />
    </main>
  );
}