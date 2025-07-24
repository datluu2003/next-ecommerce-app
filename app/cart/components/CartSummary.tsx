'use client';
import React from 'react';
import Link from 'next/link';

interface CartSummaryProps {
  totalQuantity: number;
  totalAmount: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalQuantity, totalAmount }) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-900">Số lượng sản phẩm:</span>
            <span className="font-medium text-gray-900">{totalQuantity}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-900">Tạm tính:</span>
            <span className="font-medium text-gray-900">{totalAmount.toLocaleString()} VND</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Phí vận chuyển:</span>
            <span className="font-medium text-green-600">Miễn phí</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
              <span className="text-lg font-bold text-green-600">
                {totalAmount.toLocaleString()} VND
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <Link
            href="/checkout"
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 text-center block"
          >
            Thanh toán
          </Link>
          
          <Link
            href="/Shop"
            className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 text-center block"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
