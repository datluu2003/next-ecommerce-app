'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfileHeader from './components/ProfileHeader';
import QuickStats from './components/QuickStats';
import DashboardGrid from './components/DashboardGrid';
import RecentOrders from './components/RecentOrders';

interface UserStats {
  totalOrders: number;
  totalSpent: string;
  wishlistItems: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
}

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth();
  const [userStats, setUserStats] = useState<UserStats>({
    totalOrders: 0,
    totalSpent: '0đ',
    wishlistItems: 0
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Fetch user stats and recent orders
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API calls
      // For now, using mock data
      const mockStats: UserStats = {
        totalOrders: 12,
        totalSpent: '2.450.000đ',
        wishlistItems: 8
      };

      const mockOrders: Order[] = [
        {
          id: '1',
          orderNumber: 'DH001',
          date: '15/12/2024',
          total: '350.000đ',
          status: 'delivered',
          items: 3
        },
        {
          id: '2',
          orderNumber: 'DH002',
          date: '10/12/2024',
          total: '750.000đ',
          status: 'shipped',
          items: 5
        },
        {
          id: '3',
          orderNumber: 'DH003',
          date: '05/12/2024',
          total: '250.000đ',
          status: 'processing',
          items: 2
        }
      ];

      setUserStats(mockStats);
      setRecentOrders(mockOrders);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                <div className="ml-6">
                  <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="h-16 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Vui lòng đăng nhập
          </h1>
          <p className="text-gray-600 mb-6">
            Bạn cần đăng nhập để xem trang hồ sơ
          </p>
          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Đăng nhập
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <ProfileHeader user={user} />
        
        {/* Quick Stats */}
        <QuickStats stats={userStats} />
        
        {/* Dashboard Grid */}
        <DashboardGrid />
        
        {/* Recent Orders */}
        <RecentOrders orders={recentOrders} />
      </div>
    </div>
  );
}
