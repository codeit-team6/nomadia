import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/shared/libs/cn';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

/**
 * 페이지네이션 버튼 UI를 렌더링 함.  
 * 페이지 버튼을 클릭하면 setPage를 호출하여 상위 컴포넌트에서 선언한 page 상태값을 업데이트 함  
 * 
 * 좌측 화살표: 이전 페이지 그룹으로 이동, currentPage를 페이지 그룹의 마지막 요소로 업데이트, 현재페이지가 페이지 그룹 사이즈보다 작으면 비활성화  
 * 우측 화살표: 다음 페이지 그룹으로 이동, currentPage를 페이지 그룹의 첫번째 요소로 업데이트, 페이지 그룹의 마지막 요소가 totalPages와 같거나 더 크면 비활성화  

 *
 * @param {number} totalPages - 전체 페이지 수
 * @param {number} currentPage - 현재 페이지
 * @param {function} setPage - 현재 페이지를 변경하는 함수 (React 상태 업데이트 함수)
 *
 * @example
 * ```tsx
 * 'use client';
 * import { useState } from 'react';
 * import Pagination from '@/shared/components/pagination/pagination';
 *
 * export default function Page() {
 *   const [page, setPage] = useState(1); //Pagination 컴포넌트의 프롭으로 넘겨주세요
 *
 *   useEffect(() => {
 *     fetchData(page); // 페이지 변경 시 API 호출 등
 *   }, [page]);
 *
 *   return (
 *     <Pagination totalPages={33} currentPage={page} setPage={setPage} />
 *   );
 * }
 * ```
 */

const Pagination = ({ totalPages, currentPage, setPage }: PaginationProps) => {
  const PAGE_GROUP_SIZE = 5;
  const pageGroupNum = Math.ceil(currentPage / PAGE_GROUP_SIZE);
  const startPage = pageGroupNum * PAGE_GROUP_SIZE - PAGE_GROUP_SIZE + 1; //-4
  const endPage = Math.min(totalPages, startPage + PAGE_GROUP_SIZE - 1); //+4

  const pageRange = [];

  for (let i = startPage; i <= endPage; i++) {
    pageRange.push(i);
  }

  const leftDisable = currentPage <= PAGE_GROUP_SIZE;
  const rightDisable = pageGroupNum * PAGE_GROUP_SIZE >= totalPages;

  return (
    <div className="flex">
      <button
        disabled={leftDisable}
        onClick={() => {
          setPage((pageGroupNum - 1) * PAGE_GROUP_SIZE);
        }}
        className="flex-center size-[4rem]"
      >
        <ChevronLeft
          size={17}
          strokeWidth={3}
          color={leftDisable ? '#B3B4BC' : '#1F1F22'}
        />
      </button>

      {pageRange.map((page) => (
        <button
          key={page}
          className={cn(
            'size-[4rem] text-[1.4rem] font-medium text-gray-300',
            page === currentPage &&
              'border-b-main border-b-2 font-bold text-gray-950',
          )}
          onClick={() => setPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={rightDisable}
        onClick={() => {
          if (currentPage) setPage((pageGroupNum + 1) * PAGE_GROUP_SIZE - 4);
        }}
        className="flex-center size-[4rem]"
      >
        <ChevronRight
          size={17}
          strokeWidth={3}
          color={rightDisable ? '#B3B4BC' : '#1F1F22'}
        />
      </button>
    </div>
  );
};

export default Pagination;
