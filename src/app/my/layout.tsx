'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import Sidebar from '@/features/my/components/sidebar';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { width } = useWindowSize();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (width && width >= 768 && pathname === '/my') {
      router.push('/my/profile');
    }
  }, [width, pathname, router]);

  const isMobile = width ? width < 768 : false;
  const isMyPageRoot = pathname === '/my';
  const isActivityRegistration =
    pathname === '/my/my-activities/activity-registration';

  return (
    <div className="mx-auto flex justify-center px-[2.4rem] py-[3rem] md:max-w-[68.4rem] md:gap-[3rem] lg:max-w-[98rem] lg:gap-[5rem]">
      <aside
        className={
          (isMobile && !isMyPageRoot) || isActivityRegistration ? 'hidden' : ''
        }
      >
        <Sidebar />
      </aside>
      <main className={`${isMobile && isMyPageRoot ? 'hidden' : ''} w-full`}>
        {children}
      </main>
    </div>
  );
}
