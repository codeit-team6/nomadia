'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import {
  LoginFormType,
  loginSchema,
} from '@/features/auth/validators/auth.schema';

import { login as apiLogin } from '../../api/auth.api';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const storeLogin = useAuthStore((state) => state.login);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const response = await apiLogin(data);
      storeLogin(response);
      toast.success('로그인 성공');
      router.push('/');
    } catch (error) {
      console.error('로그인 실패', error);
      toast.error('로그인에 실패했습니다');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">이메일</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="passwrod" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '로그인 중 ...' : '로그인'}
      </button>
    </form>
  );
};
