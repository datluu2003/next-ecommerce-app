'use client';
import React from 'react';
import Link from 'next/link';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  iconType: 'login' | 'register';
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle, linkText, linkHref, iconType }) => {
  const renderIcon = () => {
    if (iconType === 'login') {
      return (
        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    } else {
      return (
        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      );
    }
  };

  return (
    <div>
      <div className={`mx-auto h-12 w-12 flex items-center justify-center rounded-full ${
        iconType === 'login' ? 'bg-green-100' : 'bg-blue-100'
      }`}>
        {renderIcon()}
      </div>
      <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
        {title}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        {subtitle}{' '}
        <Link href={linkHref} className={`font-medium ${
          iconType === 'login' ? 'text-green-600 hover:text-green-500' : 'text-blue-600 hover:text-blue-500'
        }`}>
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default AuthHeader;
