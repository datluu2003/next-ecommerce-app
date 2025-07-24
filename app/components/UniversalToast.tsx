'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UniversalToastData } from '@/app/hooks/useUniversalToast';

interface UniversalToastProps {
  toast: UniversalToastData | null;
  onClose: () => void;
}

const UniversalToast: React.FC<UniversalToastProps> = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (toast) {
      setIsVisible(true);
      // Tự động ẩn sau thời gian chỉ định
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Đợi animation kết thúc
      }, toast.duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'add-to-cart':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
        );
      case 'buy-now':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        );
      case 'remove-item':
        return (
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        );
      case 'clear-cart':
        return (
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        );
      case 'update-quantity':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const showProductInfo = toast.productName && (toast.type === 'add-to-cart' || toast.type === 'buy-now');
  const showCartButton = toast.type === 'add-to-cart' || toast.type === 'remove-item';

  return (
    <div className="fixed top-4 right-4 z-50">
      <div 
        className={`transform transition-all duration-300 ease-in-out ${
          isVisible 
            ? 'translate-x-0 opacity-100 scale-100' 
            : 'translate-x-full opacity-0 scale-95'
        }`}
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 min-w-[320px] max-w-[400px]">
          {/* Header với icon và close button */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {getIcon()}
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {toast.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {toast.message}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Product info (chỉ hiển thị cho add-to-cart và buy-now) */}
          {showProductInfo && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-3">
              {toast.productImage && (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0">
                  <Image
                    src={toast.productImage}
                    alt={toast.productName || ''}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-gray-900 text-sm line-clamp-1">
                  {toast.productName}
                </h5>
                <div className="flex items-center justify-between mt-1">
                  {toast.quantity && (
                    <span className="text-xs text-gray-500">
                      Số lượng: {toast.quantity}
                    </span>
                  )}
                  {toast.totalPrice && (
                    <span className="text-sm font-semibold text-green-600">
                      {toast.totalPrice.toLocaleString()}đ
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          {showCartButton && (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
                className="flex-1 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors py-2"
              >
                Đóng
              </button>
              <button 
                className="flex-1 bg-green-600 text-white text-xs font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => {
                  router.push('/cart');
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
              >
                Xem giỏ hàng
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversalToast;
