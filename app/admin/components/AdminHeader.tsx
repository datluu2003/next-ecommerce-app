"use client";
import React from "react";
import { useAuth } from '@/app/contexts/AuthContext';

export default function AdminHeader() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-gray-900 text-white px-8 py-4 flex items-center justify-between shadow">
      <div className="flex items-center gap-4">
        <span className="font-bold text-2xl tracking-wide">Admin Panel</span>
      </div>
      <nav className="flex gap-6">
        <a href="/admin" className="hover:underline">Dashboard</a>
        <a href="/admin/categories" className="hover:underline">Danh mục</a>
        <a href="/admin/products" className="hover:underline">Sản phẩm</a>
        <a href="/admin/orders" className="hover:underline">Đơn hàng</a>
        <a href="/admin/users" className="hover:underline">Người dùng</a>
      </nav>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 20c0-4 8-4 8-4s8 0 8 4" />
          </svg>
          <span className="font-medium">{user?.username || user?.email || 'Admin'}</span>
        </div>
        <button
          className="ml-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition"
          onClick={logout}
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}
