'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Dropdown from '@/shared/components/dropdown/dropdown';
import { searchVariant } from '@/shared/libs/constants/searchVariant';

interface SearchProps {
  placeholder?: string;
  setKeyword?: (value: React.SetStateAction<string>) => void;
}

const Search: React.FC<SearchProps> = ({
  placeholder = '내가 원하는 체험은',
  setKeyword: externalSetKeyword, // 부모에서 내려줄 수도 있음
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL 기본값
  const defaultValue = searchParams.get('search') ?? '';
  const defaultRegion = searchParams.get('region') ?? '';
  const defaultCategory = searchParams.get('category') ?? '';
  const defaultTime = searchParams.get('time') ?? '';

  // 상태
  const [keyword, setKeyword] = useState(defaultValue);
  const [region, setRegion] = useState(defaultRegion);
  const [category, setCategory] = useState(defaultCategory);
  const [time, setTime] = useState(defaultTime);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setKeyword(defaultValue);
    setRegion(defaultRegion);
    setCategory(defaultCategory);
    setTime(defaultTime);
  }, [defaultValue, defaultRegion, defaultCategory, defaultTime]);

  useEffect(() => {
    if (externalSetKeyword) {
      externalSetKeyword(keyword);
    }
  }, [keyword, externalSetKeyword]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) params.set('search', keyword.trim());
    if (region) params.set('region', region);
    if (category) params.set('category', category);
    if (time) params.set('time', time);

    router.push(`/activities${params.toString() ? `?${params}` : ''}`);
  };

  const style = searchVariant.main;

  const dropdownBtnClass =
    'flex w-[20rem] items-center justify-between rounded txt-14-medium text-gray-700 bg-transparent hover:bg-gray-50';

  const dropdownMenuClass =
    'mt-1 w-full bg-white rounded shadow-md txt-12-medium';

  const optionBtnClass =
    'w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50';

  return (
    <div className={style.wrapper}>
      <p className={style.title}>무엇을 체험하고 싶으신가요?</p>
      <div className={style.inputBox}>
        {/* <SearchIcon className="text-gray-950" size={24} /> */}

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? '' : placeholder}
          className={style.input}
        />

        {/* 지역 */}
        <Dropdown
          trigger={
            <button type="button" className={dropdownBtnClass}>
              <span>{region || '지역'}</span>
            </button>
          }
          dropdownClassName={dropdownMenuClass}
        >
          {['서울', '경기', '부산'].map((option) => (
            <button
              key={option}
              type="button"
              className={optionBtnClass}
              onClick={() => setRegion(option)}
            >
              {option}
            </button>
          ))}
        </Dropdown>

        {/* 카테고리 */}
        <Dropdown
          trigger={
            <button type="button" className={dropdownBtnClass}>
              <span>{category || '카테고리'}</span>
            </button>
          }
          dropdownClassName={dropdownMenuClass}
        >
          {['문화,예술', '식음료', '스포츠', '투어', '관광', '웰빙'].map(
            (option) => (
              <button
                key={option}
                type="button"
                className={optionBtnClass}
                onClick={() => setCategory(option)}
              >
                {option}
              </button>
            ),
          )}
        </Dropdown>

        {/* 시간 */}
        <Dropdown
          trigger={
            <button type="button" className={dropdownBtnClass}>
              <span>{time || '날짜'}</span>
            </button>
          }
          dropdownClassName={dropdownMenuClass}
        >
          {['13:00-14:00', '14:00-15:00', '15:00-16:00'].map((option) => (
            <button
              key={option}
              type="button"
              className={optionBtnClass}
              onClick={() => setTime(option)}
            >
              {option}
            </button>
          ))}
        </Dropdown>

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
