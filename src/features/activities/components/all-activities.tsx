'use client';

import {
  Binoculars,
  BusFront,
  Leaf,
  Music,
  Soup,
  Volleyball,
} from 'lucide-react';
import { useState } from 'react';

import { ActivityCard } from '@/features/activities/components/activity-card';
import useResActivitiesQuery from '@/features/activities/libs/hooks/useResActivitiesQuery';
import Pagination from '@/shared/components/pagination/pagination';
import { Button } from '@/shared/libs/shadcn/components/ui/button';

/**
 * 모든 체험 컴포넌트
 * @author 김영현
 * @returns 모든 체험 컴포넌트
 */
const AllActivities = () => {
  const [active, setActive] = useState('문화 · 예술');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, size } = useResActivitiesQuery({
    sort: 'latest',
    category: active,
    page,
  });

  // 로딩 상태 처리 -> 추후 로딩 관련 스피너 추가 필요
  if (isLoading) {
    return <div className="py-12 text-center text-gray-400">로딩 중...</div>;
  }

  // 에러 상태 처리 -> 추후 에러 상태 관련 컴포넌트 추가 필요
  if (isError) {
    return (
      <div className="py-12 text-center text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  const activities = data?.activities ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / size));

  const handleCategoryChange = (category: string) => {
    setActive(category);
    setPage(1);
  };

  return (
    <div className="px-[2.4rem] md:px-[3rem] lg:px-[4rem]">
      <div className="mb-[1rem] flex items-center justify-between md:mb-[1.6rem] lg:mb-[2rem]">
        <p className="flex items-center gap-2 text-[1.8rem] font-bold text-gray-950 md:text-[3.2rem]">
          <span role="img" aria-label="모든 체험">
            🛼
          </span>{' '}
          모든 체험
        </p>
        {/* 추후 드롭다운 영역 추가 */}
      </div>

      <div className="category-scroll -mx-[2.4rem] mb-[2.4rem] flex flex-nowrap gap-[0.8rem] overflow-x-auto px-[2.4rem] whitespace-nowrap md:mb-[3rem] md:gap-[2rem]">
        <Button
          variant={active === '문화 · 예술' ? 'selected' : 'default'}
          size="sm"
          className="group"
          onClick={() => handleCategoryChange('문화 · 예술')}
        >
          <Music
            className={`size-[1.7rem] ${active === '문화 · 예술' ? 'text-white' : 'text-gray-950'}`}
          />{' '}
          문화 · 예술
        </Button>

        <Button
          variant={active === '식음료' ? 'selected' : 'default'}
          size="sm"
          className="group"
          onClick={() => handleCategoryChange('식음료')}
        >
          <Soup
            className={`size-[1.7rem] ${active === '식음료' ? 'text-white' : 'text-gray-950'}`}
          />{' '}
          식음료
        </Button>

        <Button
          variant={active === '스포츠' ? 'selected' : 'default'}
          size="sm"
          className="group"
          onClick={() => handleCategoryChange('스포츠')}
        >
          <Volleyball
            className={`size-[1.7rem] ${active === '스포츠' ? 'text-white' : 'text-gray-950'}`}
          />{' '}
          스포츠
        </Button>

        <Button
          variant={active === '투어' ? 'selected' : 'default'}
          size="sm"
          className="group"
          onClick={() => handleCategoryChange('투어')}
        >
          <Binoculars
            className={`size-[1.7rem] ${active === '투어' ? 'text-white' : 'text-gray-950'}`}
          />{' '}
          투어
        </Button>

        <Button
          variant={active === '관광' ? 'selected' : 'default'}
          size="sm"
          className="group"
          onClick={() => handleCategoryChange('관광')}
        >
          <BusFront
            className={`size-[1.7rem] ${active === '관광' ? 'text-white' : 'text-gray-950'}`}
          />{' '}
          관광
        </Button>

        <Button
          variant={active === '웰빙' ? 'selected' : 'default'}
          size="sm"
          className="group"
          onClick={() => handleCategoryChange('웰빙')}
        >
          <Leaf
            className={`size-[1.7rem] ${active === '웰빙' ? 'text-white' : 'text-gray-950'}`}
          />{' '}
          웰빙
        </Button>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-x-[1.8rem] gap-y-[2.4rem] md:gap-x-6 md:gap-y-[2.4rem] lg:grid-cols-4 lg:gap-x-[3rem] lg:gap-y-[2.4rem]">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
};

export default AllActivities;
