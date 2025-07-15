'use client';

import React from 'react';

const GNB: React.FC = () => {
  const isLoggedIn = true; // 임시코드 (로그인, 비로그인 확인용)

  return (
    <nav className="w-[375px] md:w-[744px] lg:w-[1920px] max-w-[1920px] mx-auto h-[48px] md:h-[60px] px-[24px] py-[6px] md:px-[30px] md:py-[10px] lg:px-[200px] bg-[#E9F7FF] flex justify-between items-center">
     
      <div className="text-[#188FFF] txt-20-bold cursor-pointer md:flex md:gap-3">
        <img src="images/logo.png" alt='Logo' className='w-[29px] h-[24px]' />
        <span className='text-[#188FFF] txt-20-bold hidden md:block'>NOMADIA</span>
      </div>
      
      <ul className="text-[#1F1F22] txt-14-medium flex space-x-12">
        {isLoggedIn ? (
          <>
            {/* 로그인 상태일 때 */}
            <li>
              <img src="/images/alarm.png" alt="알람" className="w-[16px] h-[19px]" />
            </li>
            <span className='text-gray-100'>|</span>
            <li className='flex items-center gap-2'>
              <img
                src="/images/profile.png"
                alt="프로필"
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

export default GNB;
