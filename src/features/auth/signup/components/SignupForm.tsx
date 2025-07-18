'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FormInput } from '@/shared/components/form-input/form-input';

import { signup as apiSignup } from '../../api/auth.api';
import { SignupFormType, signupSchema } from '../../validators/auth.schema';

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<SignupFormType> = async (data) => {
    try {
      const response = await apiSignup(data);
      console.log(response);
      alert('회원가입 성공');
      router.push('./login');
    } catch (error) {
      console.log('회원가입 실패', error);
      alert('회원가입 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="이메일"
        name="email"
        type="text"
        placeholder="email을 입력해주세요."
        register={register}
        error={errors.email}
      />
      <FormInput
        label="닉네임"
        name="nickname"
        type="text"
        placeholder="닉네임을 입력해주세요."
        register={register}
        error={errors.nickname}
      />
      <div>
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="background border"
      >
        {isSubmitting ? '가입 중 ...' : '회원가입'}
      </button>
    </form>
  );
};
