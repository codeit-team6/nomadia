'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      localStorage.removeItem('auth-storage');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      {children}
    </QueryClientProvider>
  );
}
