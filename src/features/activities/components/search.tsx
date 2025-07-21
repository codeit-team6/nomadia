'use client';

import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

interface SearchProps {
  variant?: 'main' | 'sub';
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({
  variant = 'main',
  placeholder = '내가 원하는 체험은',
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultValue = searchParams.get('search') ?? '';
  const [keyword, setKeyword] = useState(defaultValue);

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (!trimmed) {
      router.push('/activities');
    } else {
      router.push(`/activities?search=${encodeURIComponent(trimmed)}`);
    }
  };

  const variants = {
    main: {
      wrapper: 'flex-center flex-col gap-[1.2rem] py-[1.6rem]',
      title: 'font-bold text-[1.6rem] text-gray-950 md:text-[3.2rem]',
      inputBox:
        'flex h-[4.9rem] w-full items-center rounded-full bg-white py-[0.6rem] pr-[0.8rem] pl-[2rem] shadow-md md:h-[7rem] md:w-[62.8rem] lg:w-[104rem] lg:py-[1rem] lg:pr-[1.2rem] lg:pl-[3.2rem]',
      input:
        'text-medium flex-1 px-4 text-[1.4rem] text-black outline-none placeholder:text-gray-500 md:text-[1.8rem]',
      button:
        'font-bold bg-main h-[3.7rem] w-[8.5rem] rounded-full text-[1.4rem] text-white md:h-[5rem] md:w-[12rem] md:text-[1.6rem]',
    },
    sub: {
      wrapper: 'flex-center flex-col gap-[1.2rem] py-[1.6rem]',
      title: 'font-bold text-[1.6rem] text-gray-950 md:text-[3.2rem]',
      inputBox:
        'flex h-[4.9rem] w-full items-center rounded-full bg-white py-[0.6rem] pr-[0.8rem] pl-[2rem] shadow-md md:h-[7rem] md:w-[62.8rem] lg:w-[104rem] lg:py-[1rem] lg:pr-[1.2rem] lg:pl-[3.2rem]',
      input:
        'text-medium flex-1 px-4 text-[1.4rem] text-black outline-none placeholder:text-gray-500 md:text-[1.8rem]',
      button:
        'font-bold bg-main h-[3.7rem] w-[8.5rem] rounded-full text-[1.4rem] text-white md:h-[5rem] md:w-[12rem] md:text-[1.6rem]',
    },
  };

  const style = variants[variant];

  return (
    <div className={style.wrapper}>
      <p className={style.title}>무엇을 체험하고 싶으신가요?</p>
      <div className={style.inputBox}>
        <SearchIcon className="text-gray-950" size={24} />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          placeholder={placeholder}
          className={style.input}
        />
        <button onClick={handleSearch} className={style.button}>
          검색하기
        </button>
      </div>
    </div>
  );
};

export default Search;
