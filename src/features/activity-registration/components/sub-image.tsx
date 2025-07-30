'use client';

import { CirclePlus, X } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { validateImageFile } from '@/features/activity-registration/libs/hooks/useImageMutation';

interface SubImageUploadProps {
  label: string;
  name: string;
  error?: { message?: string };
  value: string[]; // 이미지 URL 배열
  onChange: (imageUrls: string[]) => void;
  maxImages?: number;
}

/**
 * 소개 이미지 업로드 컴포넌트
 * 최대 4장까지 업로드 가능하며, hover 시 삭제 버튼 표시
 */
const SubImageUpload = ({
  label,
  name,
  error,
  value,
  onChange,
  maxImages = 4,
}: SubImageUploadProps) => {
  const [localImageUrls, setLocalImageUrls] = useState<string[]>([]); // 로컬 이미지 URL 배열
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    const localUrl = URL.createObjectURL(file);
    const newLocalUrls = [...localImageUrls, localUrl];
    setLocalImageUrls(newLocalUrls);
  };

  const handleRemoveImage = (index: number) => {
    if (index < value.length) {
      const newImageUrls = value.filter((_, i) => i !== index);
      onChange(newImageUrls);
    } else {
      const localIndex = index - value.length;
      const newLocalUrls = localImageUrls.filter((_, i) => i !== localIndex);
      setLocalImageUrls(newLocalUrls);

      if (localImageUrls[localIndex]) {
        URL.revokeObjectURL(localImageUrls[localIndex]);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (value.length + localImageUrls.length < maxImages) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleUploadClick = () => {
    if (value.length + localImageUrls.length < maxImages) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="mb-[2.4rem] flex flex-col gap-[0.8rem]">
      {/* 라벨 */}
      <label className="text-[1.6rem] font-bold text-gray-950">{label}</label>

      {/* 이미지 업로드 영역 */}
      <div className="category-scroll flex gap-[1.2rem] pb-[0.8rem]">
        {/* 업로드 버튼 (최대 개수에 도달하지 않았을 때만 표시) - 왼쪽에 고정 */}
        {value.length + localImageUrls.length < maxImages && (
          <div
            onClick={handleUploadClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleUploadClick();
              }
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            className="flex-center h-[8rem] w-[8rem] flex-shrink-0 cursor-pointer flex-col rounded-[0.8rem] border-1 border-gray-100 hover:bg-gray-50 md:h-[12.6rem] md:w-[12.6rem] md:rounded-[1.6rem]"
          >
            <div className="flex-center flex-col gap-[0.8rem]">
              <CirclePlus size={26} className="text-gray-500 opacity-70" />
              <p className="text-[1.3rem] font-medium text-gray-500 md:text-[1.4rem]">
                이미지 추가
              </p>
            </div>
          </div>
        )}

        {/* 업로드된 이미지들 (서버 + 로컬) */}
        {[...value, ...localImageUrls].map((imageUrl, index) => (
          <div
            key={index}
            className="group relative h-[8rem] w-[8rem] flex-shrink-0 rounded-[0.8rem] border-1 border-gray-100 md:h-[12.6rem] md:w-[12.6rem]"
          >
            <Image
              src={imageUrl}
              alt={`소개 이미지 ${index + 1}`}
              className="h-full w-full rounded-[0.8rem] object-cover md:h-[12.6rem] md:w-[12.6rem] md:rounded-[1.6rem]"
              width={80}
              height={80}
            />

            {/* 삭제 버튼 (hover 시 표시) */}
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="bg-opacity-70 flex-center absolute -top-[0.5rem] -right-[0.7rem] h-[2rem] w-[2rem] rounded-full bg-gray-950 text-white md:h-[2.6rem] md:w-[2.6rem]"
            >
              <X size={10} className="font-bold md:size-[1.8rem]" />
            </button>
          </div>
        ))}
      </div>

      {/* 이미지 개수 정보 */}
      <p className="text-[1.3rem] font-medium text-gray-600">
        {value.length + localImageUrls.length}/{maxImages}개 (최대 {maxImages}
        개)
      </p>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* 에러 메시지 */}
      {error && <p className="text-[1.2rem] text-red-500">{error.message}</p>}
    </div>
  );
};

export default SubImageUpload;
