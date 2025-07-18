import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { RefObject, useEffect, useRef } from 'react';

export const useInfiniteScroll = <R>(
  loadMoreRef: RefObject<HTMLDivElement | null>,
  isLoading: boolean,
  hasNextPage: boolean,
  fetchNextPage: UseInfiniteQueryResult<R, Error>['fetchNextPage'],
  triggerMargin: number,

  //   UseInfiniteQueryResult<R, Error>는 useInfiniteQuery 훅이 반환하는 객체 전체의 타입이에요.
  // 그 객체 안에 fetchNextPage라는 함수가 있어요.
  // 이 중 fetchNextPage 프로퍼티의 타입만 뽑아서 사용하고 싶을 때 ['fetchNextPage']를 붙여요.
) => {
  //   Intersection observer는 브라우저 뷰포트(Viewport)와 원하는 요소(Element)의 교차점을 관찰하며,
  //   요소가 뷰포트에 포함되는지 아닌지 구별하는 기능을 제공한다. (더 쉽게는 특정 요소가 사용자 화면에 보이는지 안보이는지 판단함)
  //   const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (isLoading || !hasNextPage || !loadMoreRef?.current) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        rootMargin: `${triggerMargin}px`,
      },
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [isLoading, hasNextPage, loadMoreRef, triggerMargin, fetchNextPage]);
};
