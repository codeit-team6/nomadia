'use client';

import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { searchVariant } from '@/shared/libs/constants/searchVariant';

interface SearchProps {
  placeholder?: string;
  setKeyword?: (value: React.SetStateAction<string>) => void;
}

const Search: React.FC<SearchProps> = ({
  placeholder = '내가 원하는 체험은',
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultValue = searchParams.get('search') ?? '';
  const [keyword, setKeyword] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setKeyword(defaultValue);
  }, [defaultValue]);

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (!trimmed) {
      router.push('/activities');
    } else {
      router.push(`/activities?search=${encodeURIComponent(trimmed)}`);
    }
  };

  const style = searchVariant.main;

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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? '' : placeholder}
          className={style.input}
        />
        <button
          type="button"
          onClick={handleSearch}
          className={`${style.button} cursor-pointer`}
        >
          검색하기
        </button>
      </div>
    </div>
  );
};

export default Search;
