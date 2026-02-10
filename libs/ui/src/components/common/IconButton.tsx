import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  variant?: 'primary' | 'light';
  onClick?: () => void;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'light',
  onClick,
  className = '',
}) => {
  const bgClass =
    variant === 'primary' ? 'bg-orange text-white' : 'orange-light';

  return (
    <button
      className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm md:h-9 md:w-9 md:rounded-xl ${bgClass} ${className}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
