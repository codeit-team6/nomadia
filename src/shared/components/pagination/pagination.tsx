import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/shared/libs/cn';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ totalPages, currentPage, setPage }: PaginationProps) => {
  const PAGE_GROUP_SIZE = 5;
  const pageGroupNum = Math.ceil(currentPage / PAGE_GROUP_SIZE);
  const pageEnd = Math.min(pageGroupNum * PAGE_GROUP_SIZE);
  const pageStart = Math.max(1, pageEnd - 4);
  const pageRange = [];

  for (let i = pageStart; i <= pageEnd; i++) {
    if (i <= totalPages) pageRange.push(i);
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
