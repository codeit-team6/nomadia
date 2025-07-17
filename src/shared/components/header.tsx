'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const Header: React.FC = () => {
  const isLoggedIn = true; // 임시코드 (로그인, 비로그인 확인용)
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('로그아웃 처리');
    setOpenDropdown(false);
  };

  return (
    <nav className="bg-sub mx-auto flex h-[4.8rem] w-full items-center justify-between px-[2.4rem] py-[0.6rem] md:h-[6rem] md:px-[3rem] md:py-[1rem] lg:px-[20rem]">
      <div className="text-main txt-20-bold cursor-pointer md:flex md:gap-3">
        <Image src="/images/icons/logo.svg" alt="Logo" width={29} height={24} />
        <Image
          src="/images/icons/nomadia.svg"
          alt="Logo Name"
          width={102}
          height={29}
          className="hidden md:block"
        />
      </div>

      <ul className="txt-14-medium flex items-center space-x-12 text-gray-950">
        {isLoggedIn ? (
          <>
            {/* 로그인 상태일 때 */}
            <li>
              <Image
                src="/images/icons/alarm.svg"
                alt="알람"
                width={24}
                height={24}
              />
            </li>

            <li className="text-gray-100">|</li>

            {/* 프로필 + 드롭다운 */}
            <li className="relative">
              <button
                className="flex items-center gap-5"
                onClick={() => setOpenDropdown((prev) => !prev)}
              >
                <Image
                  src="/images/icons/profile.svg"
                  alt="프로필사진"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="txt-14-medium text-gray-950">정만철</span>
              </button>

              {/* 드롭다운 메뉴 */}
              {openDropdown && (
                <div ref={dropdownRef} className="absolute">
                  <button
                    onClick={handleLogout}
                    className="block w-full hover:bg-gray-100"
                  >
                    로그아웃
                  </button>
                  <Link
                    href="/mypage"
                    className="block py-2 hover:bg-gray-100"
                    onClick={() => setOpenDropdown(false)}
                  >
                    마이페이지
                  </Link>
                </div>
              )}
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
