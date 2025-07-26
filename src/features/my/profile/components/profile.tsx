'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  ProfileFormType,
  profileSchema,
} from '@/features/auth/validators/auth.schema';
import { getMe } from '@/features/my/profile/lib/api/profile.api';
import { editMe } from '@/features/my/profile/lib/api/profile.api';
import { FormInput } from '@/shared/components/form-input/form-input';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';

import { ProfilePatch } from '../lib/types/types';

const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
  });
  const router = useRouter();
  const [isloading, setIsLoading] = useState(true);

  // 사용자 정보 가져오기 (hook?)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userData = await getMe();
        reset(userData);
      } catch (error) {
        console.error(error);
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [reset]);

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<ProfileFormType> = async (data) => {
    try {
      const requestBody: ProfilePatch = {};
      requestBody.nickname = data.nickname;

      if (data.password) {
        requestBody.newPassword = data.password;
      }
      await editMe(requestBody);
      toast.success('프로필 수정 성공');
      router.push('/my');
    } catch (error) {
      console.error(error);
      toast.error(`수정 실패`);
    }
  };

  if (isloading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center"
    >
      <div className="relative h-[12rem] w-[12rem]">
        <Image
          src="/images/icons/profile-default.png"
          alt="profile-image"
          fill
          className="rounded-full object-cover"
        />
        <Image
          src="/images/icons/edit-button.png"
          alt="edit-image"
          width={30}
          height={30}
          className="absolute right-0 bottom-0 cursor-pointer"
        />
      </div>
      <div className="w-full">
        <FormInput
          label="닉네임"
          name="nickname"
          type="text"
          placeholder=""
          register={register}
          error={errors.nickname}
        />
        <FormInput
          label="이메일"
          name="email"
          type="email"
          disabled
          register={register}
        />
        <FormInput
          label="비밀번호"
          name="password"
          type="password"
          placeholder="변경할 경우에만 입력해주세요"
          register={register}
          error={errors.password}
        />
        <FormInput
          label="비밀번호 확인"
          name="confirmPassword"
          type="password"
          placeholder="변경할 경우에만 입력해주세요"
          register={register}
          error={errors.confirmPassword}
        />
      </div>
      <div className="mt-[1.2rem] flex w-full justify-between gap-[1.2rem] md:justify-center">
        <button
          type="button"
          onClick={() => router.push('/my')}
          className="h-[4.7rem] w-full cursor-pointer rounded-[1.4rem] border border-gray-200 text-[1.6rem] font-medium text-gray-600 md:hidden"
        >
          취소하기
        </button>
        <button
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
          className="bg-main h-[4.7rem] w-full cursor-pointer rounded-[1.4rem] text-[1.6rem] font-bold text-white disabled:bg-gray-200 md:h-[4.1rem] md:w-[12rem] md:text-[1.4rem]"
        >
          저장하기
        </button>
      </div>
    </form>
  );
};

export default Profile;
