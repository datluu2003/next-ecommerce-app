'use client';

import React from 'react';

interface ProfileHeaderProps {
  user: {
    username: string;
    email: string;
  };
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-bold">
            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Chào mừng, {user.username}!
          </h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500">
            Quản lý tài khoản và đơn hàng của bạn
          </p>
        </div>
      </div>
    </div>
  );
}
