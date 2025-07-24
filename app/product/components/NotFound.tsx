import Link from 'next/link';
import React from 'react';

interface NotFoundProps {
  slug: string;
}

const NotFound: React.FC<NotFoundProps> = ({ slug }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
    <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
      <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h2>
      <p className="text-gray-600 mb-6">Sản phẩm với slug `{slug}` không tồn tại hoặc đã bị xóa.</p>
      <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Quay lại trang chủ
      </Link>
    </div>
  </div>
);

export default NotFound; 