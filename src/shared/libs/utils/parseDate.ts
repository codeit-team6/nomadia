/**
 * 날짜 문자열을 Date 객체로 변환합니다.
 * @param date 날짜 문자열 (YYYY-MM-DD 또는 YYYY.MM.DD 형식)
 * @returns Date 객체 (유효하지 않은 경우 new Date(0) 반환)
 */
export const parseDate = (date: string) => {
  if (!date) return new Date(0);

  // 점(.)을 하이픈(-)으로 변환하여 YYYY-MM-DD 형식으로 정규화
  const normalizedDate = date.replace(/\./g, '-');
  const parts = normalizedDate.split('-');

  if (parts.length !== 3) return new Date(0);

  const [year, month, day] = parts.map(Number);

  // 유효성 검사
  if (isNaN(year) || isNaN(month) || isNaN(day)) return new Date(0);
  if (month < 1 || month > 12 || day < 1 || day > 31) return new Date(0);

  const parsed = new Date(year, month - 1, day);
  if (isNaN(parsed.getTime())) return new Date(0);

  // 라운드트립 체크: 원본 입력과 변환된 날짜가 일치하는지 확인
  const yearStr = parsed.getFullYear().toString();
  const monthStr = String(parsed.getMonth() + 1).padStart(2, '0');
  const dayStr = String(parsed.getDate()).padStart(2, '0');
  const roundTripDate = `${yearStr}-${monthStr}-${dayStr}`;

  return normalizedDate === roundTripDate ? parsed : new Date(0);
};

/**
 * 날짜 문자열 배열을 오름차순으로 정렬합니다.
 * @param dates 날짜 문자열 배열
 * @returns 정렬된 날짜 문자열 배열
 */
export const sortDatesAscending = (dates: string[]): string[] => {
  return [...dates].sort((a, b) => {
    const dateA = parseDate(a);
    const dateB = parseDate(b);
    return dateA.getTime() - dateB.getTime();
  });
};

/**
 * 내일 날짜를 YYYY-MM-DD 형식의 문자열로 반환합니다.
 * @returns 내일 날짜 문자열 (예: "2025-08-28")
 */
export const getTomorrowDateString = (): string => {
  const today = new Date();
  const tomorrow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
  );

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * 날짜가 내일 이후인지 검증합니다.
 * @param dateString YYYY-MM-DD 형식의 날짜 문자열
 * @returns 내일 이후인 경우 true, 그렇지 않으면 false
 */
export const isDateAfterTomorrow = (dateString: string): boolean => {
  if (!dateString) return false;

  const selectedDate = parseDate(dateString);
  if (selectedDate.getTime() === new Date(0).getTime()) return false;

  const tomorrowString = getTomorrowDateString();
  const [tomorrowYear, tomorrowMonth, tomorrowDay] = tomorrowString
    .split('-')
    .map(Number);
  const tomorrow = new Date(tomorrowYear, tomorrowMonth - 1, tomorrowDay);

  // 시간을 00:00:00으로 설정하여 날짜만 비교
  selectedDate.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);

  return selectedDate >= tomorrow;
};
