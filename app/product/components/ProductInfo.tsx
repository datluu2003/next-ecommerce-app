import React from 'react';

interface ProductInfoProps {
  productName: string;
  price: number;
  rating?: number;
  ratingCount?: number;
  shortDescription?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ productName, price, rating = 4.5, ratingCount = 128, shortDescription }) => (
  <div>
    <h1 className="text-4xl font-bold text-gray-900 mb-4">{productName}</h1>
    {/* Rating */}
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-600">({rating} - {ratingCount} đánh giá)</span>
    </div>
    <div className="text-2xl font-bold text-green-700 mb-4">{price.toLocaleString()} VND</div>
    {shortDescription && <p className="text-gray-700 mb-4">{shortDescription}</p>}
  </div>
);

export default ProductInfo; 