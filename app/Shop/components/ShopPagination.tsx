import React from "react";

interface ShopPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ShopPagination({ currentPage, totalPages, onPageChange }: ShopPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 space-x-2">
      <button
        className="px-3 py-1 rounded text-gray-700 bg-gray-200 hover:bg-gray-300"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }).map((_, idx) => (
        <button
          key={idx + 1}
          className={`px-3 text-gray-700 py-1 rounded ${currentPage === idx + 1 ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300" }`}
          onClick={() => onPageChange(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded text-gray-700 bg-gray-200 hover:bg-gray-300"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}
