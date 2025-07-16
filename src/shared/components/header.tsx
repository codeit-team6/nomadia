'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  const isLoggedIn = false; // 임시코드 (로그인, 비로그인 확인용)

  return (
    <nav className="bg-sub mx-auto flex h-[4.8rem] w-full max-w-[192rem] items-center justify-between px-[2.4rem] py-[0.6rem] md:h-[6rem] md:px-[3rem] md:py-[1rem] lg:px-[20rem]">
      <div className="text-main txt-20-bold cursor-pointer md:flex md:gap-3">
        <Image src="/images/icons/logo.svg" alt="Logo" width={29} height={24} />
        <span className="txt-20-bold hidden text-[#188FFF] md:block">
          NOMADIA
        </span>
      </div>

      <ul className="txt-14-medium flex space-x-12 text-gray-950">
        {isLoggedIn ? (
          <>
            {/* 로그인 상태일 때 */}
            <li>
              <Image
                src="/images/icons/alarm.svg"
                alt="알람"
                width={16}
                height={19}
              />
            </li>
            <span className="text-gray-100">|</span>
            <li className="flex items-center gap-2">
              <Image
                src="/images/icons/profile.svg"
                alt="프로필"
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
              />
              <span className="txt-14-medium text-gray-950">정만철</span>
            </li>
          </>
        ) : (
          <>
            {/* 비로그인 상태일 때 */}
            <li>
              <Link href="/login" className="">
                로그인
              </Link>
            </li>
            <li>
              <Link href="/signup" className="">
                회원가입
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
