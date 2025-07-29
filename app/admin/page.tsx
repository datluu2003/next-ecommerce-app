"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Chỉ cho admin truy cập
  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.replace("/login");
    }
  }, [user, router]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Các card quản lý sẽ thêm sau */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold text-gray-700">Quản lý danh mục</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold text-gray-700">Quản lý sản phẩm</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold text-gray-700">Quản lý đơn hàng</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold text-gray-700">Quản lý người dùng</span>
        </div>
      </div>
    </>
  );
}
