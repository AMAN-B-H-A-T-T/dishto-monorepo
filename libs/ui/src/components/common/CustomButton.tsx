import React from 'react';

export interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
  disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  icon,
  bgColor = 'bg-orange',
  textColor = 'text-white',
  className = '',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex cursor-pointer items-center justify-center gap-1 rounded-md px-2 py-1 text-xs transition-all duration-300 md:px-3 md:py-1.5 md:text-sm ${bgColor} ${textColor} ${
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90'
      } ${className}`}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};
