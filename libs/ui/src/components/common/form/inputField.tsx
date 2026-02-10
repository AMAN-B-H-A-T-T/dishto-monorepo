import { CommonFormProps } from 'libs/ui/src/types/form';
import type React from 'react';

import type { FieldValues } from 'react-hook-form';

interface InputProps<T extends FieldValues>
  extends CommonFormProps<T>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  label: string;
  labelClassName?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  containerClassName?: string;
  className?: string;
}

export const Input = <T extends FieldValues>({
  label,
  name,
  error,
  register,
  helperText,
  labelClassName = '',
  iconPosition = 'right',
  containerClassName = '',
  className = '',
  icon,
  ...rest
}: InputProps<T>) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className={`mb-3 block text-sm font-medium ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className={`relative ${containerClassName}`}>
        <input
          id={name}
          {...register(name)}
          className={`focus:border-orange w-full rounded-md border border-[#E6E6E6] px-3 py-2 text-sm transition-all duration-200 outline-none ${
            icon && iconPosition === 'left' ? 'pl-10' : ''
          } ${icon && iconPosition === 'right' ? 'pr-10' : ''} ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...rest}
        />
        {icon && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${
              iconPosition === 'left' ? 'left-3' : 'right-3'
            }`}
          >
            {icon}
          </div>
        )}
        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
        {!error && helperText && (
          <span className="mt-2 text-xs color-red-light">{helperText}</span>
        )}
      </div>
    </div>
  );
};
