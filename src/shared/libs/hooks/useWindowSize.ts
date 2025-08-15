import { useEffect, useState } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
  isDesktop: boolean | undefined;
  isTablet: boolean | undefined;
  isMobile: boolean | undefined;
}

const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    isDesktop: undefined,
    isTablet: undefined,
    isMobile: undefined,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({
        width,
        height,
        isDesktop: width >= 1024,
        isTablet: width >= 768 && width < 1024,
        isMobile: width < 768,
      });
    };

    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize); // resize 이벤트 추적(등록)
    return () => window.removeEventListener('resize', handleResize); // 언마운트 시 해제
  }, []);
  return windowSize;
};

export default useWindowSize;
