'use client';

import LandingPage from '@/features/landing/landing-page';
import Footer from '@/shared/components/footer';
import Header from '@/shared/components/header';

const Page = () => {
  return (
    <>
      <Header />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </>
  );
};

export default Page;
