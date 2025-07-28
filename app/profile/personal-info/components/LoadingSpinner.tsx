'use client';

import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
      </div>
    </div>
  );
}
