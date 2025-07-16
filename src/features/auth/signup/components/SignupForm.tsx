'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

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
      alert('회원가입 성공');
      router.push('./login');
    } catch (error) {
      console.log('회원가입 실패', error);
      alert('회원가입 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="border"
          placeholder="이메일을 입력해주세요"
        />
        {/* 여러 input 속성을 한꺼번에 적용시킴 
                    name: 'email',
                    onChange: (e) => {},
                    ref
                    ...
                */}
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <input id="nickname" type="text" {...register('nickname')} />
        {errors.nickname && <p>{errors.nickname.message}</p>}
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="passwrod" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confrimPassword">비밀번호 확인</label>
        <input
          id="confrimPassword"
          type="text"
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
