"use client";
import React, { useState, useEffect } from "react";
import type { Product, Category } from "@/app/components/data";
import ShopFilter from "./ShopFilter";
import ShopProductList from "./ShopProductList";
import ShopPagination from "./ShopPagination";

// Thêm type mở rộng cho Product

type ProductWithCategory = Product & { category?: { _id: string } };

interface ShopSideBarCategoryProps {
  products: ProductWithCategory[];
  categories: Category[];
}

const PRODUCTS_PER_PAGE = 6;

export default function ShopSideBarCategory({ products, categories }: ShopSideBarCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400); // 400ms delay

    return () => clearTimeout(handler);
  }, [search]);

  // Lọc sản phẩm theo danh mục
  let filteredProducts = selectedCategory
    ? products.filter((p) => p.category && p.category._id === selectedCategory)
    : products;

  // Lọc theo từ khóa (không phân biệt hoa/thường, dùng debouncedSearch)
  if (debouncedSearch) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }

  // Sắp xếp theo giá
  if (sort === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // Lấy sản phẩm cho trang hiện tại
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Reset về trang 1 khi đổi danh mục
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <div className="flex gap-8">
      {/* Sidebar bên trái */}
      <div className="w-64 bg-gray-100 rounded-xl shadow p-4 mb-6">
        <h3 className="font-bold text-2xl text-gray-700 mb-4">Danh mục</h3>
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full text-left px-3 py-2 rounded ${!selectedCategory ? "bg-green-100 font-bold text-green-700" : "hover:bg-gray-100 text-gray-700 font-semibold"}`}
              onClick={() => setSelectedCategory(null)}
            >
              Tất cả
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={`w-full text-left px-3 py-2 rounded ${selectedCategory === cat.id ? "bg-green-100 font-bold text-green-700" : "hover:bg-gray-100 text-gray-700 font-semibold"}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Sản phẩm bên phải */}
      <div className="flex-1">
        <ShopFilter
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
        />
        <ShopProductList products={paginatedProducts} />
        <ShopPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
