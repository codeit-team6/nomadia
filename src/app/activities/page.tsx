'use client';

import { Suspense } from 'react';

import ActivitiesPageContent from '@/app/activities/page-content';

const ActivitiesPage = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ActivitiesPageContent />
    </Suspense>
  );
};

export default ActivitiesPage;
