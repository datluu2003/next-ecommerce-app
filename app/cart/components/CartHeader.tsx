'use client';
import React from 'react';

interface CartHeaderProps {
  totalQuantity: number;
}

const CartHeader: React.FC<CartHeaderProps> = ({ totalQuantity }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
      <p className="text-gray-600 mt-2">
        Bạn có {totalQuantity} sản phẩm trong giỏ hàng
      </p>
    </div>
  );
};

export default CartHeader;
