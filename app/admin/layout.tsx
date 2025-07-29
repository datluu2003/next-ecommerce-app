// app/admin/layout.tsx
'use client';

import React from 'react';
import AdminHeader from './components/AdminHeader';
import AdminSidebar from './components/AdminSidebar';
import AdminFooter from './components/AdminFooter';


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Layout này đã override hoàn toàn layout root, chỉ render các thành phần admin
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
      <AdminFooter />
    </div>
  );
}
