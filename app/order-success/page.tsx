"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const [copied, setCopied] = useState(false);

  const copyOrderNumber = () => {
    if (orderNumber) {
      navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    // Có thể thêm analytics tracking ở đây
  }, [orderNumber]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          {/* Icon thành công */}
          <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          {/* Tiêu đề */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Đặt hàng thành công!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.
          </p>

          {/* Mã đơn hàng */}
          {orderNumber && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Mã đơn hàng của bạn:</p>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg font-bold text-gray-900">{orderNumber}</span>
                <button
                  onClick={copyOrderNumber}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Copy mã đơn hàng"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    />
                  </svg>
                </button>
              </div>
              {copied && (
                <p className="text-xs text-green-600 mt-1">Đã copy!</p>
              )}
            </div>
          )}

          {/* Thông tin tiếp theo */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Các bước tiếp theo:</h3>
            <ul className="text-sm text-blue-800 space-y-1 text-left">
              <li>• Chúng tôi sẽ gọi điện xác nhận đơn hàng trong vòng 24h</li>
              <li>• Đơn hàng sẽ được chuẩn bị và giao trong 2-3 ngày làm việc</li>
              <li>• Bạn sẽ nhận được thông báo khi đơn hàng được giao</li>
              <li>• Liên hệ hotline nếu cần hỗ trợ: 1900-xxxx</li>
            </ul>
          </div>

          {/* Nút hành động */}
          <div className="space-y-3">
            <Link
              href="/Shop"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 inline-block"
            >
              Tiếp tục mua sắm
            </Link>
            
            <Link
              href="/"
              className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 inline-block"
            >
              Về trang chủ
            </Link>
          </div>

          {/* Thông tin liên hệ */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Cần hỗ trợ? Liên hệ chúng tôi qua{' '}
              <a href="mailto:support@freshgarden.com" className="text-green-600 hover:underline">
                email
              </a>{' '}
              hoặc hotline{' '}
              <a href="tel:1900xxxx" className="text-green-600 hover:underline">
                1900-xxxx
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
