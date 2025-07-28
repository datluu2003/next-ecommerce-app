'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface PersonalInfoHeaderProps {
  isEditing: boolean;
  isLoading: boolean;
  onEdit: () => void;
  onCancel: () => void;
}

export default function PersonalInfoHeader({ 
  isEditing, 
  isLoading, 
  onEdit, 
  onCancel 
}: PersonalInfoHeaderProps) {
  const router = useRouter();

  const handleBackToProfile = () => {
    router.push('/profile');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleBackToProfile}
            className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h1>
            <p className="text-gray-600">Quản lý thông tin tài khoản của bạn</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                form="personal-info-form"
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </>
          ) : (
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
