'use client';

import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  const isLoggedIn = true; // 임시코드 (로그인, 비로그인 확인용)

  return (
    <nav className="w-full max-w-[192rem] mx-auto h-[4.8rem] md:h-[6rem] px-[2.4rem] py-[0.6rem] md:px-[3rem] md:py-[1rem] lg:px-[20rem] bg-[#E9F7FF] flex justify-between items-center">
     
      <div className="text-[#188FFF] txt-20-bold cursor-pointer md:flex md:gap-3">
        <Image
          src="images/icons/logo.svg"
          alt="Logo"
          width={29}
          height={24}
          className="w-[2.9rem] h-[2.4rem]"
        />
        <span className='text-[#188FFF] txt-20-bold hidden md:block'>NOMADIA</span>
      </div>
      
      <ul className="text-[#1F1F22] txt-14-medium flex space-x-12">
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
            <span className='text-gray-100'>|</span>
            <li className='flex items-center gap-2'>
              <Image
                src="/images/icons/profile.svg"
                alt="프로필"
                width={24}
                height={24}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-gray-950 txt-14-medium">정만철</span>
            </li>
          </>
        ) : (
          <>
            {/* 비로그인 상태일 때 */}
        <li>
          <a href="/login" className="">로그인</a>
        </li>
        <li>
          <a href="/signup" className="">회원가입</a>
        </li>
        </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
