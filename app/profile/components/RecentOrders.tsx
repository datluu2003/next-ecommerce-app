'use client';

import React from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
}

interface RecentOrdersProps {
  orders: Order[];
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'Đã giao';
      case 'shipped':
        return 'Đang giao';
      case 'processing':
        return 'Đang xử lý';
      case 'pending':
        return 'Chờ xử lý';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Đơn hàng gần đây</h2>
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">📦</div>
          <p className="text-gray-600 mb-4">Bạn chưa có đơn hàng nào</p>
          <Link
            href="/Shop"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Mua sắm ngay
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Đơn hàng gần đây</h2>
        <Link
          href="/profile/orders"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Xem tất cả →
        </Link>
      </div>
      
      <div className="space-y-4">
        {orders.slice(0, 5).map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">
                    Đơn hàng #{order.orderNumber}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Ngày đặt: {order.date}</p>
                  <p>Số lượng: {order.items} sản phẩm</p>
                  <p className="font-medium text-gray-900">Tổng tiền: {order.total}</p>
                </div>
              </div>
            </div>
            <div className="mt-3 flex space-x-3">
              <Link
                href={`/profile/orders/${order.id}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Xem chi tiết
              </Link>
              {order.status === 'delivered' && (
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                  Mua lại
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
