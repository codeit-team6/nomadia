import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

/**
 * @description react-hook-form 과 함께 쓰는 공통 입력 컴포넌트
 *  * 제네릭을 사용하여 로그인, 회원가입 등 모든 폼에서 재사용할 수 있습니다. so hard,,,
 * @param {string} label - 창 위에 표시될 라벨 텍스트
 * @param {Path<T>} name - react-hook-form에 등록할 필드의 이름
 * @param {UseFormRegister<T>} register - 부모 폼에서 전달받는 react-hook-form의 register 함수
 * @param {FieldError} [errors] - 해당 필드의 유효성 검사 에러 객체
 * @param {React.InputHTMLAttributes<HTMLInputElement>} ...rest - type, placeholder 등 표준 HTML input 속성을 그대로 전달받습니다.
 */

interface FormInputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
}

export const FormInput = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  ...rest
}: FormInputProps<T>) => {
  return (
    <div className="mb-6 flex flex-col">
      <label htmlFor={name} className="txt-16-medium mb-3">
        {label}
      </label>
      <input
        id={name}
        {...rest}
        {...register(name)} // type, placeholder 등을 여기에 적용
        className={`txt-14-medium mb-1.5 h-[54px] w-full rounded-xl border px-4 ${
          error ? 'border-red-500' : 'border-gray-200'
        } `}
      />
      {error && <p className="txt-12-medium text-red-500">{error.message}</p>}
    </div>
  );
};
