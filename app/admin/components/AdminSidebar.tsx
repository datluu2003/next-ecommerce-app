"use client";
import React from "react";

const sidebarItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Quản lý danh mục", href: "/admin/categories" },
  { label: "Quản lý sản phẩm", href: "/admin/products" },
  { label: "Quản lý đơn hàng", href: "/admin/orders" },
  { label: "Quản lý người dùng", href: "/admin/users" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-full py-8 px-4 flex flex-col gap-4">
      <nav className="flex flex-col gap-4">
        {sidebarItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-gray-700 font-medium px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
