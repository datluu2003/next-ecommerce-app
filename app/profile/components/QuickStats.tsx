'use client';

import React from 'react';

interface QuickStatsProps {
  stats: {
    totalOrders: number;
    totalSpent: string;
    wishlistItems: number;
  };
}

export default function QuickStats({ stats }: QuickStatsProps) {
  const statItems = [
    {
      icon: '📦',
      value: stats.totalOrders.toString(),
      label: 'Tổng đơn hàng',
      bgColor: 'bg-blue-100'
    },
    {
      icon: '💰',
      value: stats.totalSpent,
      label: 'Tổng chi tiêu',
      bgColor: 'bg-green-100'
    },
    {
      icon: '❤️',
      value: stats.wishlistItems.toString(),
      label: 'Sản phẩm yêu thích',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {statItems.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center`}>
              <span className="text-2xl">{item.icon}</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{item.value}</h3>
              <p className="text-gray-600">{item.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
