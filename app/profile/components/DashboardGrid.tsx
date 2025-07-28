'use client';

import React from 'react';
import Link from 'next/link';

interface DashboardGridItem {
  title: string;
  description: string;
  icon: string;
  href: string;
  bgColor: string;
}

export default function DashboardGrid() {
  const gridItems: DashboardGridItem[] = [
    {
      title: 'Thông tin cá nhân',
      description: 'Cập nhật thông tin tài khoản',
      icon: '👤',
      href: '/profile/personal-info',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Đơn hàng của tôi',
      description: 'Xem lịch sử đặt hàng',
      icon: '📦',
      href: '/profile/orders',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Danh sách yêu thích',
      description: 'Sản phẩm đã lưu',
      icon: '❤️',
      href: '/profile/wishlist',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Địa chỉ giao hàng',
      description: 'Quản lý địa chỉ',
      icon: '📍',
      href: '/profile/addresses',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Đổi mật khẩu',
      description: 'Bảo mật tài khoản',
      icon: '🔒',
      href: '/profile/change-password',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Cài đặt',
      description: 'Tùy chỉnh tài khoản',
      icon: '⚙️',
      href: '/profile/settings',
      bgColor: 'bg-gray-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {gridItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`${item.bgColor} rounded-lg p-6 hover:shadow-md transition-shadow duration-200 block`}
        >
          <div className="flex items-start">
            <div className="text-3xl mr-4">{item.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
