'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';

import { FormInput } from '@/shared/components/form-input/form-input';

const Profile = () => {
  const { register } = useForm({
    mode: 'onChange',
  });

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[12rem] w-[12rem]">
        <Image
          src="/images/icons/logo-desktop.png"
          alt=""
          fill
          className="rounded-full object-cover"
        />
        <Image
          src="/images/icons/edit-button.png"
          alt=""
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
        />
        <FormInput
          label="닉네임"
          name="nickname"
          type="text"
          placeholder=""
          register={register}
        />
        <FormInput
          label="비밀번호"
          name="password"
          type="password"
          placeholder=""
          register={register}
        />
        <FormInput
          label="비밀번호 확인"
          name="password"
          type="password"
          placeholder=""
          register={register}
        />
      </div>
      <div className="mt-[1.2rem] flex w-full justify-between gap-[1.2rem] md:justify-center">
        <button className="h-[4.7rem] w-full rounded-[1.4rem] border border-gray-200 text-[1.6rem] font-medium text-gray-600 md:hidden">
          취소하기
        </button>
        <button className="bg-main h-[4.7rem] w-full rounded-[1.4rem] text-[1.6rem] font-bold text-white md:h-[4.1rem] md:w-[12rem] md:text-[1.4rem]">
          저장하기
        </button>
      </div>
    </div>
  );
};

export default Profile;
