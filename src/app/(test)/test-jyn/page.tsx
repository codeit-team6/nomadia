'use client';
import { useState } from 'react';

import Pagination from '@/shared/components/pagination/pagination';

export default function Page() {
  const [page, setPage] = useState(3);
  return (
    <>
      <Pagination totalPages={33} currentPage={page} setPage={setPage} />
    </>
  );
}
