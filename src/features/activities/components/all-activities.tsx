'use client';

import {
  Binoculars,
  BusFront,
  ChevronDown,
  Leaf,
  Music,
  Soup,
  Volleyball,
} from 'lucide-react';
import { useState } from 'react';

import { ActivityCard } from '@/features/activities/components/activity-card';
import useResActivitiesQuery from '@/features/activities/libs/hooks/useResActivitiesQuery';
import Dropdown from '@/shared/components/dropdown';
import Pagination from '@/shared/components/pagination/pagination';
import { Button } from '@/shared/libs/shadcn/components/ui/button';

const CATEGORIES = [
  { name: '문화 · 예술', icon: Music },
  { name: '식음료', icon: Soup },
  { name: '스포츠', icon: Volleyball },
  { name: '투어', icon: Binoculars },
  { name: '관광', icon: BusFront },
  { name: '웰빙', icon: Leaf },
];

const sortOptions = [
  { label: '최신순', value: 'latest' },
  { label: '낮은 가격순', value: 'price_asc' },
  { label: '높은 가격순', value: 'price_desc' },
];

interface AllActivitiesProps {
  keyword?: string;
}

/**
 * 모든 체험 컴포넌트
 * @author 김영현
 * @returns 모든 체험 컴포넌트
 * @description 모든 체험 목록을 표시하는 컴포넌트입니다.
 */
const AllActivities = ({ keyword }: AllActivitiesProps) => {
  const [active, setActive] = useState('문화 · 예술');
  const [page, setPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState<
    'latest' | 'price_asc' | 'price_desc' | 'most_reviewed'
  >('latest');

  const { data, isLoading, isError, size } = useResActivitiesQuery({
    sort: selectedSort,
    category: active,
    page,
    keyword,
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

  const handleSortChange = (
    value: 'latest' | 'price_asc' | 'price_desc' | 'most_reviewed',
  ) => {
    setSelectedSort(value);
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
        <Dropdown
          trigger={
            <button className="txt-16-medium flex items-center text-black">
              가격 <ChevronDown size={18} className="ml-1" />
            </button>
          }
          dropdownClassName="absolute right-0"
        >
          <div className="border-sub-300 txt-16-medium h-[11rem] w-[11.2rem] overflow-hidden rounded-xl border-[0.1rem] bg-white">
            {sortOptions.map(({ label, value }) => (
              <button
                key={value}
                onClick={() =>
                  handleSortChange(
                    value as 'latest' | 'price_asc' | 'price_desc',
                  )
                }
                className={`txt-14-medium w-full px-4 py-2 hover:bg-blue-50 ${
                  selectedSort === value ? 'text-main font-bold' : 'text-black'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Dropdown>
      </div>

      <div className="category-scroll -mx-[2.4rem] mb-[2.4rem] flex flex-nowrap gap-[0.8rem] overflow-x-auto px-[2.4rem] whitespace-nowrap md:mb-[3rem] md:gap-[2rem]">
        {CATEGORIES.map(({ name, icon: Icon }) => (
          <Button
            key={name}
            variant={active === name ? 'selected' : 'default'}
            size="sm"
            className="group"
            onClick={() => handleCategoryChange(name)}
          >
            <Icon
              className={`size-[1.7rem] ${active === name ? 'text-white' : 'text-gray-950'}`}
            />{' '}
            {name}
          </Button>
        ))}
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
        className="flex-center mt-[2.4rem] mb-[16.5rem] md:mt-[3rem] md:mb-[27.7rem] lg:mb-[27.1rem]"
      />
    </div>
  );
};

export default AllActivities;
