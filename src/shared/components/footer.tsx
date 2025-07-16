'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full max-w-[192rem] mx-auto h-[11.6rem] md:h-[14rem] py-[3rem] px-[2.4rem] md:px-[4rem] lg:px-[20rem] text-gray-600 bg-white border-t border-gray-100 txt-13-medium">
      
      {/* 모바일 사이즈: 위에 보일 Privacy Policy · FAQ */}
      <div className="flex justify-center gap-7 mb-4 md:hidden">
        <a href="/privacy-policy">Privacy Policy</a>
        <span>·</span>
        <a href="/faq">FAQ</a>
      </div>

      <div className="flex flex-row justify-between items-center md:grid md:grid-cols-3 md:items-center">
        
        <div className="text-gray-400 text-left">
          ©nomadia - 2025
        </div>

        <div className="hidden md:flex justify-center gap-4">
          <a href="/privacy-policy">Privacy Policy</a>
          <span>·</span>
          <a href="/faq">FAQ</a>
        </div>

        <div className="flex justify-end items-center gap-[1.6rem]">
          <Image
            src="/images/icons/facebook.svg"
            alt="facebook"
            width={20}
            height={20}
          />
          <Image
            src="/images/icons/instagram.svg"
            alt="instagram"
            width={20}
            height={20}
          />
          <Image
            src="/images/icons/youtube.svg"
            alt="youtube"
            width={20}
            height={20}
          />
          <Image
            src="/images/icons/x.svg"
            alt="x"
            width={20}
            height={20}
          />
        </div>

      </div>
    </footer>
  );
}
