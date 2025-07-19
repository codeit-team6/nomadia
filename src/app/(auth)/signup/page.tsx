import Image from 'next/image';
import Link from 'next/link';

import { SignupForm } from '@/features/auth/signup/components/SignupForm';

const Signup = () => {
  return (
    <div className="mx-6 mt-9 mb-10 flex w-full max-w-[343px] flex-col items-center md:mt-[100px] md:max-w-[460px]">
      <Image
        src="/images/icons/logo-desktop.png"
        alt="Signup logo image"
        width={86}
        height={71}
        className="mb-10 w-[86px] md:w-[120px]"
      />

      <SignupForm />

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
