'use client';
import React from 'react';

interface SubmitButtonProps {
  isLoading: boolean;
  text: string;
  loadingText: string;
  type?: 'login' | 'register';
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  isLoading, 
  text, 
  loadingText, 
  type = 'login',
  disabled = false
}) => {
  const colorClasses = type === 'login' 
    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';

  const renderIcon = () => {
    if (isLoading) {
      return (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      );
    }

    if (type === 'login') {
      return (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      );
    }
  };

  return (
    <div>
      <button
        type="submit"
        disabled={isLoading || disabled}
        className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
          isLoading || disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : `${colorClasses} focus:outline-none focus:ring-2 focus:ring-offset-2`
        } transition-colors duration-200`}
      >
        {renderIcon()}
        {isLoading ? loadingText : text}
      </button>
    </div>
  );
};

export default SubmitButton;
