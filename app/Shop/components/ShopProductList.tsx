import React from 'react';
import type { Product } from '@/app/components/data';
import Link from 'next/link';
import Image from 'next/image';

export default function ShopProductList({ products }: { products: Product[] }) {
  // Chỉ lấy 6 sản phẩm đầu tiên
  const displayProducts = products.slice(0, 6);

  if (!displayProducts.length) return <div className="text-center py-8 text-gray-500">Không có sản phẩm nào.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {displayProducts.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.slug}`}
          className="rounded-xl shadow-lg overflow-hidden bg-white hover:scale-105 transition-transform duration-200 border border-gray-100 flex flex-col"
        >
          <Image
            src={Array.isArray(product.image) ? product.image[0] : product.image}
            alt={product.name}
            width={400}
            height={208}
            className="w-full h-52 object-cover object-center"
            unoptimized={true} // Nếu ảnh là link ngoài, thêm dòng này
          />
          <div className="flex-1 flex flex-col justify-between p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[48px] font-sans">{product.name}</h3>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-sl font-bold text-green-600 font-sans">
                {product.price.toLocaleString('vi-VN')} VND
              </span>
              <button className="ml-2 px-4 py-1 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition font-sans">Mua ngay</button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}