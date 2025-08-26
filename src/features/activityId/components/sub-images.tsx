'use client';
import { GalleryThumbnails } from 'lucide-react';
import Image from 'next/image';

import SubImagesModal from '@/features/activityId/components/sub-images-modal';
import { SubImages as SubImagesType } from '@/features/activityId/libs/types/activityInfo';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import { cn } from '@/shared/libs/cn';

// 이미지랑 본문은 ssr로 해보고 싶은데, 이미지 클릭해서 바뀌는거 하려면 useState사용해야 하고... 그리고 체험예약 페이지라 5분간격으로 재요청 보내는데,
// 근데 그러면 더 보여지는게 빠른 SSR이 좋지 않나. 근데 diff로 업데이트하니까 로딩이 눈에 보일잉ㄹ은 없을거 같긴 하구..
// seo도 중요한데, 적어도 타이틀이랑 본문은 ssr로 하는게 좋을거 같다.
// 구글 이미지 검색 결과에 나오려면, 이미지가 서버에서 HTML에 포함되어 있어야 좋음
// 대표이미지는 SSR로, 그 뒤에 CSR로 교체해본다거나(?)

const SubImages = ({ images }: { images: SubImagesType[] | undefined }) => {
  const { modalName, openModal } = useModalStore();
  if (images === undefined) return null;
  const length = images.length;

  return (
    <>
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
              <button
                key={i}
                className={cn(
                  'relative size-full',
                  length === 3 && i === 0 && 'row-span-2',
                  length === 4 && i === 0 && 'row-span-3',
                )}
                onClick={() => openModal('image-modal')}
              >
                <Image
                  key={i}
                  src={image.imageUrl}
                  alt="activity-image"
                  fill
                  className="object-cover"
                />
              </button>
            );
          })}
          {length > 1 && (
            <button
              className="flex-center btn-action-blue absolute right-[1.6rem] bottom-[1.6rem] gap-[0.4rem] rounded-[0.6rem] bg-white px-[0.8rem] py-[0.4rem] text-[1.2rem] md:right-[2.4rem] md:bottom-[2.4rem] md:gap-[0.6rem] md:rounded-[0.6rem] md:px-[1.2rem] md:py-[0.8rem] md:text-[1.4rem]"
              onClick={() => openModal('image-modal')}
            >
              <GalleryThumbnails className="size-[1rem] md:size-[1.8rem]" />
              이미지 전체
            </button>
          )}
        </div>
        {modalName === 'image-modal' && <SubImagesModal images={images} />}
      </>
    </>
  );
};

export default SubImages;
