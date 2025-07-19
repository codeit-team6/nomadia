import Image from 'next/image';
import Link from 'next/link';

import { LoginForm } from '@/features/auth/login/components/LoginForm';

const Login = () => {
  return (
    <div className="mx-6 mt-9 mb-10 flex w-full max-w-[343px] flex-col items-center md:max-w-[460px]">
      <Image
        src="/images/icons/logo-desktop.png"
        alt="Signup logo image"
        width={86}
        height={71}
        className="mb-10 w-[86px] md:w-[120px]"
      />

      <LoginForm />

      <p className="txt-16-medium mt-4 mb-12 text-gray-400">
        아직 계정이 없으신가요?{' '}
        <Link
          href="/signup"
          className="text-main txt-16-medium cursor-pointer underline"
        >
          가입하기
        </Link>
      </p>

      <div className="my-6 flex w-full items-center">
        <hr className="border-main flex-1" />
        <span className="txt-16-medium text-main mx-4"> OR </span>
        <hr className="border-main flex-1" />
      </div>

      <div className="flex w-full justify-between">
        <p className="txt-16-medium text-gray-950">간편 로그인하기</p>
        <button type="button" className="cursor-pointer">
          <Image
            src="/images/icons/logo-kakao.png"
            alt="kakao image"
            width={42}
            height={42}
          />
        </button>
      </div>
    </div>
  );
};

export default Login;
