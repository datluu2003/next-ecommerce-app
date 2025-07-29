'use client';

import React from 'react';

interface User {
  _id: string;
  role?: string;
}

interface AccountInfoSectionProps {
  user: User;
  onDeleteAccount?: () => void;
  isLoading?: boolean;
}

export default function AccountInfoSection({ user, onDeleteAccount, isLoading }: AccountInfoSectionProps) {
  const handleDeleteClick = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!')) {
      if (onDeleteAccount) onDeleteAccount();
    }
  };
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Thông tin tài khoản</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <span className="text-gray-600">ID tài khoản:</span>
          <span className="ml-2 font-mono text-gray-900">{user._id}</span>
        </div>
        <div>
          <span className="text-gray-600">Vai trò:</span>
          <span className="ml-2 capitalize text-gray-900">{user.role || 'Khách hàng'}</span>
        </div>
      </div>
      <button
        type="button"
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
        onClick={handleDeleteClick}
        disabled={isLoading}
      >
        {isLoading ? 'Đang xóa...' : 'Xóa tài khoản'}
      </button>
    </div>
  );
}
