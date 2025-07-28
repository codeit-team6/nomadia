/**
 * @description 날짜 문자열을 Date 객체로 변환합니다. (ex. "2025.07.28" -> "2025-07-28")
 *
 * @author 김영현
 * @param date 날짜 문자열
 * @returns Date 객체
 */
export const parseDate = (date: string) => {
  const normalizedDate = date.replace(/\./g, '-');
  const parsed = new Date(normalizedDate);

  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
};
