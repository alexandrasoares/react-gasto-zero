import React from 'react';
import Button from './button.component';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  retrying?: boolean;
  retryLabel?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  retrying = false,
  retryLabel = 'Try Again',
}) => {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="max-w-md w-full mx-4 bg-white border border-red-200 rounded-lg shadow-sm p-6 text-center">
        <h2 className="text-lg font-semibold text-red-700 mb-2">Something went wrong</h2>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} loading={retrying} variant="primary">
            {retryLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
