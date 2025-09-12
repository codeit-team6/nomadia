'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import SubImagesButton from '@/features/activityId/components/sub-images-button';
import SubImagesModal from '@/features/activityId/components/sub-images-modal';
import { SubImages as SubImagesType } from '@/features/activityId/libs/types/activityInfo';
import { DetailSubImagesSkeleton } from '@/shared/components/skeleton/skeleton';
import { cn } from '@/shared/libs/cn';

const SubImages = ({ images }: { images: SubImagesType[] | undefined }) => {
  const [loaded, setLoaded] = useState(false);

  // 첫 이미지 프리로드
  useEffect(() => {
    if (!images) return;
    const img = new window.Image();
    img.src = images[0].imageUrl;
    img.onload = () => {
      setLoaded(true); // 스켈레톤 UI off
    };
  }, [images]);

  if (!loaded) return <DetailSubImagesSkeleton />;
  if (!images) return;
  const length = images.length;
  const noImage = !images || images.length === 0;
  return (
    <>
      <div
        className={cn(
          // w-full + aspect클래스명으로 반응형 시 비율 유지
          'relative mb-[2rem] aspect-[5/3] w-full gap-2 overflow-hidden rounded-[1.6rem] md:gap-3 md:rounded-[2rem] lg:mb-[3.6rem]',
          length === 2 && 'grid grid-cols-2',
          length === 3 && 'grid grid-cols-[2fr_1fr]',
          length === 4 && 'grid grid-cols-[3fr_1fr] grid-rows-3',
        )}
      >
        {images.map((image, i) => {
          return (
            <div
              key={i}
              className={cn(
                'relative size-full',
                length === 3 && i === 0 && 'row-span-2',
                length === 4 && i === 0 && 'row-span-3',
              )}
            >
              <Image
                key={i}
                src={image.imageUrl}
                alt="activity-image"
                fill
                className="object-cover"
              />
            </div>
          );
        })}
        {length > 1 && <SubImagesButton />}
      </div>
      {!noImage && <SubImagesModal images={images} />}
    </>
  );
};

export default SubImages;
