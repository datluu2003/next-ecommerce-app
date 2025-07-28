'use client';
import React from 'react';
import Link from 'next/link';
import { CartItem } from '@/app/types/shared';

interface OrderSummaryProps {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  finalAmount: number;
  isSubmitting: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  totalQuantity,
  totalAmount,
  finalAmount,
  isSubmitting
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Đơn hàng của bạn</h2>
        
        {/* Danh sách sản phẩm */}
        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">
                  {item.quantity} x {item.price.toLocaleString()} VND
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 pt-4 space-y-3">
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
                {finalAmount.toLocaleString()} VND
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
          </button>
          
          <Link
            href="/cart"
            className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 text-center block"
          >
            Quay lại giỏ hàng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
