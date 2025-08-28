import { formatPrice } from '@/shared/libs/utils/formatPrice';

interface PriceDisplayProps {
  price: number;
  unit?: string;
}

/**
 * 가격 표시 컴포넌트
 * @author 김영현
 * @param price - 가격
 * @param unit - 단위 (기본값: /인)
 * @returns 가격 표시 컴포넌트
 */
export const PriceDisplay = ({ price, unit = '/인' }: PriceDisplayProps) => {
  return (
    <div className="flex justify-start gap-1">
      <span className="text-[1.5rem] leading-[1.8rem] font-bold text-gray-950 md:text-[1.8rem]">
        ₩ {formatPrice(price)}{' '}
        <span className="text-[1.2rem] font-semibold text-gray-400 md:text-[1.6rem]">
          {unit}
        </span>
      </span>
    </div>
  );
};
