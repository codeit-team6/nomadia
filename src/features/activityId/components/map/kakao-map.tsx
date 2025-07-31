'use client';

import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

import { ErrorMessage } from '@/shared/components/error-message/error-message';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';

//현재 로컬에 대한 키를 발급 받은거라, 머지할때는 배포 주소로 다시 받아야 함
export default function KakaoMap() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_APPKEY!, // 발급 받은 APPKEY
  });
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;
  return (
    <Map
      level={3}
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: '100%', height: '100%' }}
    >
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
        <div style={{ color: '#000' }}>Hello World!</div>
      </MapMarker>
    </Map>
  );
}
