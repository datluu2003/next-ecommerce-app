'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface RelatedProduct {
  _id: string;
  name: string;
  image: string;
  slug?: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  onProductClick?: (slug: string) => Promise<void>;
  loading?: boolean;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, onProductClick, loading }) => {
  const router = useRouter();

  const handleProductClick = async (slug: string) => {
    if (slug) {
      if (onProductClick) {
        // Sử dụng callback để update component thay vì navigate
        await onProductClick(slug);
      } else {
        // Fallback to router navigation
        router.push(`/products/${slug}`);
      }
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-5">
        <h3 className="text-lg font-semibold text-gray-900">Sản phẩm liên quan</h3>
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-500 border-t-transparent"></div>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((item) => (
          <div
            key={item._id}
            onClick={() => handleProductClick(item.slug!)}
            className={`group bg-white rounded-xl border border-gray-100 p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-green-200 ${loading ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {/* Hình ảnh sản phẩm */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-50 mb-3">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {item.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-semibold">
                  -{item.discount}%
                </div>
              )}
            </div>
            
            {/* Thông tin sản phẩm */}
            <div className="space-y-2">
              
              {/* Giá */}
              <div className="flex items-center gap-2">
                {item.price && (
                  <span className="text-base font-bold text-red-600">
                    {item.price.toLocaleString()}đ
                  </span>
                )}
                {item.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    {item.originalPrice.toLocaleString()}đ
                  </span>
                )}
              </div>
              
              {/* Button */}
              <div className="pt-1">
                <span className="inline-flex items-center text-xs text-green-600 font-medium group-hover:text-green-700 transition-colors">
                  Xem ngay
                  <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message khi không có sản phẩm */}
      {products.length === 0 && !loading && (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 10l6-3" />
            </svg>
          </div>
          <p className="text-sm text-gray-500">Không có sản phẩm liên quan</p>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts; 