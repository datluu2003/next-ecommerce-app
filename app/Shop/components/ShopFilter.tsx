import React from "react";

interface ShopFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

export default function ShopFilter({
  search, onSearchChange, sort, onSortChange
}: ShopFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center bg-white p-4 rounded-xl shadow text-gray-600">
      {/* Tìm kiếm tên */}
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="border border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg px-4 py-2 w-full md:w-72 transition-all outline-none shadow-sm "
      />
      {/* Sắp xếp */}
      <select
        value={sort}
        onChange={e => onSortChange(e.target.value)}
        className="border border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg px-4 py-2 w-full md:w-48 transition-all outline-none shadow-sm bg-white"
      >
        <option value="">Sắp xếp</option>
        <option value="price-asc">Giá tăng dần</option>
        <option value="price-desc">Giá giảm dần</option>
      </select>
    </div>
  );
}