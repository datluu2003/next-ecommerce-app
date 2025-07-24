import Image from 'next/image';
import React from 'react';

interface ProductImagesProps {
  imageUrl: string;
  productName: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({ imageUrl, productName }) => (
  <div className="space-y-4">
    <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg relative group w-[420px] h-[420px]">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={productName}
          width={320}
          height={320}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          priority
          unoptimized={imageUrl.startsWith('http') ? false : true}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">Không có ảnh</p>
          </div>
        </div>
      )}
      {/* Discount Badge */}
      <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
        -20%
      </div>
      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors group">
        <svg className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
    {/* Thumbnail Gallery */}
    <div className="grid grid-cols-4 gap-3 w-[420px]">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="aspect-square rounded-lg overflow-hidden bg-white shadow-md cursor-pointer hover:shadow-lg transition-shadow w-24 h-24">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${productName} - ${i}`}
              width={96}
              height={96}
              className="object-cover w-full h-full"
              unoptimized={imageUrl.startsWith('http') ? false : true}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default ProductImages; 