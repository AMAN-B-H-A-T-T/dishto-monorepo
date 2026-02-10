import React, { type InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  id: string;
  type: string;
  className?: string;
  containerClassName?: string; // Added for the relative div
  labelClassName?: string; // Added for dynamic label styling
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right'; // Added for icon position
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  label?: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  id,
  type,
  className = '',
  containerClassName = '', // Default empty string
  labelClassName = '', // Default empty string
  icon,
  iconPosition = 'right', // Default to right
  placeholder,
  onChange,
  onClick,
  label,
  error,
  ...rest
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`mb-3 bg-  block text-sm font-medium ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className={`relative ${containerClassName}`}>
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          onClick={onClick}
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
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
