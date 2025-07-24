'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ToastData {
  id: string;
  type: 'add-to-cart' | 'buy-now';
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

interface ToastNotificationProps {
  toast: ToastData | null;
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (toast) {
      setIsVisible(true);
      // Tự động ẩn sau 4 giây
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Đợi animation kết thúc
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const getIcon = () => {
    if (toast.type === 'add-to-cart') {
      return (
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
      );
    }
  };

  const getTitle = () => {
    return toast.type === 'add-to-cart' ? 'Đã thêm vào giỏ hàng!' : 'Chuyển đến thanh toán!';
  };

  const getSubtitle = () => {
    return toast.type === 'add-to-cart' 
      ? 'Sản phẩm đã được thêm vào giỏ hàng của bạn'
      : 'Đang chuyển đến trang thanh toán...';
  };

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
                  {getTitle()}
                </h4>
                <p className="text-xs text-gray-500">
                  {getSubtitle()}
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

          {/* Product info */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0">
              <Image
                src={toast.productImage}
                alt={toast.productName}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="font-medium text-gray-900 text-sm line-clamp-1">
                {toast.productName}
              </h5>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">
                  Số lượng: {toast.quantity}
                </span>
                <span className="text-sm font-semibold text-green-600">
                  {toast.totalPrice.toLocaleString()}đ
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="flex-1 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors py-2"
            >
              Tiếp tục mua
            </button>
            <button 
              className="flex-1 bg-green-600 text-white text-xs font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => {
                // Chuyển hướng đến trang giỏ hàng
                router.push('/cart');
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
            >
              Xem giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
