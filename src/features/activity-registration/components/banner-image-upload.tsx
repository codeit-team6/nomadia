'use client';

import { CirclePlus, X } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { validateImageFile } from '@/features/activity-registration/libs/hooks/useImageMutation';

interface BannerImageUploadProps {
  label: string;
  name: string;
  error?: { message?: string };
  required?: boolean;
  value: string; // 이미지 URL string
  onChange: (imageUrl: string) => void;
}

/**
 * 배너 이미지 업로드 컴포넌트
 * 1장만 업로드 가능하며, hover 시 삭제 버튼 표시
 */
const BannerImageUpload = ({
  label,
  name,
  error,
  value,
  onChange,
}: BannerImageUploadProps) => {
  const [localImageUrl, setLocalImageUrl] = useState<string>(''); // 로컬 이미지 URL
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 선택 핸들러
  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    // 파일 유효성 검사
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    // 로컬 이미지 URL 생성 (미리보기용)
    const localUrl = URL.createObjectURL(file);
    setLocalImageUrl(localUrl);
  };

  // 이미지 삭제 핸들러
  const handleRemoveImage = () => {
    onChange('');
    setLocalImageUrl('');
    // 로컬 URL 해제
    if (localImageUrl) {
      URL.revokeObjectURL(localImageUrl);
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  // 파일 입력 클릭 핸들러
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mt-[3rem] mb-[2.4rem] flex flex-col gap-[0.8rem]">
      {/* 라벨 */}
      <label className="text-[1.6rem] font-bold text-gray-950">{label}</label>

      {/* 이미지 업로드 영역 */}
      <div className="flex flex-wrap gap-[1.2rem]">
        {/* 업로드된 이미지 */}
        {(value || localImageUrl) && (
          <div className="group relative h-[8rem] w-[8rem] rounded-[0.8rem] border-1 border-gray-100 md:h-[12.6rem] md:w-[12.6rem] md:rounded-[1.6rem]">
            <Image
              src={localImageUrl || value}
              alt="배너 이미지"
              className="h-full w-full rounded-[0.8rem] object-cover md:h-[12.6rem] md:w-[12.6rem] md:rounded-[1.6rem]"
              width={80}
              height={80}
            />

            {/* 삭제 버튼 (hover 시 표시) */}
            <button
              type="button"
              onClick={handleRemoveImage}
              className="bg-opacity-70 flex-center absolute -top-[0.5rem] -right-[0.7rem] h-[2rem] w-[2rem] rounded-full bg-gray-950 text-white md:h-[2.6rem] md:w-[2.6rem]"
            >
              <X size={10} className="font-bold md:size-[1.8rem]" />
            </button>
          </div>
        )}

        {/* 업로드 버튼 (이미지가 없을 때만 표시) */}
        {!value && !localImageUrl && (
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
      </div>

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

export default BannerImageUpload;
