'use client';
import React from 'react';

const CheckoutHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
      <p className="text-gray-600 mt-2">
        Vui lòng điền thông tin để hoàn tất đơn hàng
      </p>
    </div>
  );
};

export default CheckoutHeader;
