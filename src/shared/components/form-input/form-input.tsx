import { FieldError, Path, UseFormRegister } from 'react-hook-form';

import { SignupFormType } from '@/features/auth/validators/auth.schema';

/**
 * @description react-hook-form 과 함께 쓰는 공통 입력 컴포넌트
 * @param {string} label - 창 위에 표시될 라벨 텍스트
 * @param {Path<SignupFormType>} name - react-hook-form에 등록할 필드의 이름
 * @param {UseFormRegister<SignupFormType>} register - 부모 폼에서 전달받는 react-hook-form의 register 함수
 * @param {FieldError} [errors] - 해당 필드의 유효성 검사 에러 객체
 * @param {React.InputHTMLAttributes<HTMLInputElement>} ...rest - type, placeholder 등 표준 HTML input 속성을 그대로 전달받습니다.
 */

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<SignupFormType>;
  register: UseFormRegister<SignupFormType>;
  error?: FieldError;
}

export const FormInput = ({
  label,
  name,
  register,
  error,
  ...rest
}: FormInputProps) => {
  return (
    <div className="mb-5 flex flex-col">
      <label htmlFor={name} className="txt-16-medium mb-3">
        {label}
      </label>
      <input
        id={name}
        {...register(name)} // type, placeholder 등을 여기에 적용
        {...rest}
        className="txt-14-medium mb-1.5 h-13.5 w-full max-w-[328px] rounded-lg border px-3 md:max-w-[640px]"
      />
      {error && <p className="txt-12-medium text-red-500">{error.message}</p>}
    </div>
  );
};
