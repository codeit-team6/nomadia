'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="w-[375px] md:w-[744px] lg:w-[1920px] max-w-[1920px] mx-auto h-[116px] md:h-[140px] py-[30px] px-[24px] md:px-[40px] lg:px-[200px] text-gray-600 bg-white border-t border-gray-100 txt-13-medium">
      
      {/* 모바일 사이즈: 위에 보일 Privacy Policy · FAQ */}
      <div className="flex justify-center gap-7 mb-4 md:hidden">
        <a href="/privacy-policy">Privacy Policy</a>
        <span>·</span>
        <a href="/faq">FAQ</a>
      </div>

      <div className="flex flex-row justify-between items-center md:grid md:grid-cols-3 md:items-center">
        
        <div className="text-gray-400 text-left">
          ©codeit - 2025
        </div>

        <div className="hidden md:flex justify-center gap-4">
          <a href="/privacy-policy">Privacy Policy</a>
          <span>·</span>
          <a href="/faq">FAQ</a>
        </div>

        <div className="flex justify-end items-center gap-[16px]">
          <img src="/images/icon_facebook.png" alt="facebook" className="w-[20px] h-[20px]" />
          <img src="/images/icon_instagram.png" alt="instagram" className="w-[20px] h-[20px]" />
          <img src="/images/icon_youtube.png" alt="youtube" className="w-[20px] h-[20px]" />
          <img src="/images/icon_x.png" alt="x" className="w-[20px] h-[20px]" />
        </div>

      </div>
    </footer>
  );
}
