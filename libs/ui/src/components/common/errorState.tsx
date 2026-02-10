// components/common/ErrorState.tsx
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  icon = <AlertCircle className="w-10 h-10 text-red-500" />,
  className = '',
}) => {
  return (
    <div className={`flex h-[70vh] items-center justify-center ${className}`}>
      <div className="w-full max-w-md p-6 text-center text-red-700 border border-red-200 shadow rounded-2xl bg-red-50">
        <div className="flex justify-center mb-3">{icon}</div>
        <h2 className="mb-2 text-lg font-semibold">{title}</h2>
        <p className="text-sm text-red-600">{message}</p>
      </div>
    </div>
  );
};
