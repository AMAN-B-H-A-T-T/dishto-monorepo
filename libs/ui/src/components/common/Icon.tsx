import React from 'react';

import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: keyof typeof LucideIcons;
  size?: number;
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  [key: string]: any; // For any additional props
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = '',
  color,
  width,
  height,
  ...props
}) => {
  const IconComponent = LucideIcons[name] as React.ComponentType<any>;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  // Use width/height if provided, otherwise use size
  const iconProps = {
    size: width || height ? undefined : size,
    width: width || (size && !height ? size : undefined),
    height: height || (size && !width ? size : undefined),
    className,
    color,
    ...props,
  };

  return <IconComponent {...iconProps} />;
};
