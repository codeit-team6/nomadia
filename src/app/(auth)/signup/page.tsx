import Image from 'next/image';
import Link from 'next/link';

import { SignupForm } from '@/features/auth/signup/components/SignupForm';

const Signup = () => {
  return (
    <div className="mx-6 mt-9 mb-10 flex w-full flex-col items-center md:max-w-[640px]">
      <Image
        src="/images/icons/logo-desktop.png"
        alt="Signup logo image"
        width={86}
        height={71}
        className="mb-10 w-[86px] md:w-[120px]"
      />

      <SignupForm />

      <div className="my-6 flex w-full items-center">
        <hr className="flex-1 border-gray-100" />
        <span className="txt-16-medium mx-4 text-gray-500">
          {' '}
          SNS 계정으로 회원가입하기{' '}
        </span>
        <hr className="flex-1 border-gray-100" />
      </div>

      <button
        type="button"
        className="txt-16-medium flex-center my-6 flex h-[54px] w-full cursor-pointer gap-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-yellow-300"
      >
        <Image
          src="/images/icons/kakao.png"
          alt="kakao image"
          width={24}
          height={24}
        />
        <span>카카오 회원가입</span>
      </button>

      <p className="txt-16-medium my-6 text-gray-400">
        이미 회원이신가요?{'  '}
        <Link href="/login" className="cursor-pointer text-gray-600 underline">
          로그인하기
        </Link>
      </p>
    </div>
  );
};

export default Signup;
