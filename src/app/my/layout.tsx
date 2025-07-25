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
    if (width && width >= 432 && pathname === '/my') {
      router.push('/my/profile');
    }
  }, [width, pathname, router]);

  const isMobile = width ? width < 432 : false;
  const isMyPageRoot = pathname === '/my';

  return (
    <div className="flex justify-center px-[2.4rem] py-[3rem]">
      <aside className={isMobile && !isMyPageRoot ? 'hidden' : ''}>
        <Sidebar />
      </aside>
      <main className={isMobile && isMyPageRoot ? 'hidden' : ''}>
        {children}
      </main>
    </div>
  );
}
