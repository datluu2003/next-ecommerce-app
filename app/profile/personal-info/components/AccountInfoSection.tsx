'use client';

import React from 'react';

interface User {
  _id: string;
  role?: string;
  username?: string;
}

interface AccountInfoSectionProps {
  user: User;
  // Đã xóa props xóa tài khoản
}

export default function AccountInfoSection({ user }: AccountInfoSectionProps) {
  // Đã xóa hàm xóa tài khoản
  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-5">Thông tin tài khoản</h3>
      <div className="flex flex-col md:flex-row gap-6 text-base mb-4 justify-center items-stretch overflow-x-auto">
        <div className="rounded-md p-4 bg-white flex flex-col items-center min-w-[220px] shadow-sm">
          <span className="text-gray-600">ID tài khoản:</span>
          <span className="mt-1 font-mono text-gray-900 break-all text-center">{user._id}</span>
        </div>
        <div className="rounded-md p-4 bg-white flex flex-col items-center min-w-[220px] shadow-sm">
          <span className="text-gray-600">Tên đăng nhập:</span>
          <span className="mt-1 text-gray-900 text-center">{user.username || '-'}</span>
        </div>
        <div className="rounded-md p-4 bg-white flex flex-col items-center min-w-[220px] shadow-sm">
          <span className="text-gray-600">Vai trò:</span>
          <span className="mt-1 capitalize text-gray-900 text-center">{user.role || 'Khách hàng'}</span>
        </div>
      </div>
      {user.role === 'admin' && (
        <div className="flex justify-end mt-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition-colors"
            onClick={() => window.location.replace('http://localhost:3000')}
          >
            Vào trang quản trị
          </button>
        </div>
      )}
      {/* Đã xóa nút xóa tài khoản */}
    </div>
  );
}
