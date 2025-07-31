'use client';

import { useEffect, useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

import { ErrorMessage } from '@/shared/components/error-message/error-message';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';

//현재 로컬에 대한 키를 발급 받은거라, 머지할때는 배포 주소로 다시 받아야 함
const KakaoMap = ({ address }: { address: string | undefined }) => {
  const [coordinates, setCoordinates] = useState({
    lat: 37.4993126534,
    lng: 127.03604683616,
  });
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO!,
    libraries: ['services'], // 요거 추가
  });

  useEffect(() => {
    if (!address || loading || error) return;

    let retryCount = 0;
    const maxRetries = 10;

    const tryGeocode = () => {
      if (
        typeof window.kakao === 'undefined' ||
        typeof window.kakao.maps === 'undefined' ||
        typeof window.kakao.maps.services === 'undefined'
      ) {
        console.warn('지도 services 아직 준비되지 않음... 재시도 중');
        if (retryCount < maxRetries) {
          retryCount += 1;
          setTimeout(tryGeocode, 300); // 300ms 후 재시도
        } else {
          console.error('kakao.maps.services 로딩 실패: 최대 재시도 초과');
        }
        return;
      }

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        console.log('geocode result', result, status);
        if (status === kakao.maps.services.Status.OK) {
          const { x, y } = result[0];
          setCoordinates({ lat: parseFloat(y), lng: parseFloat(x) });
        } else {
          console.error('주소 검색 실패:', address, status);
        }
      });
    };

    tryGeocode();
  }, [loading, error, address]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;
  return (
    <>
      <Map
        level={3}
        center={coordinates}
        style={{ width: '100%', height: '100%' }}
      >
        <MapMarker position={coordinates}></MapMarker>
      </Map>
    </>
  );
};
export default KakaoMap;
