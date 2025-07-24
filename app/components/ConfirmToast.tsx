"use client";
import React, { useEffect, useState } from 'react';

interface ConfirmToastProps {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmToast: React.FC<ConfirmToastProps> = ({ 
  isVisible, 
  message, 
  onConfirm, 
  onCancel 
}) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTimeLeft(5);
      setIsClosing(false);
      
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsClosing(true);
            setTimeout(() => {
              onCancel();
            }, 300); // Thời gian cho animation slide out
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isVisible, onCancel]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-20 right-4 z-40 transition-all duration-300 ${isClosing ? 'animate-slide-out' : 'animate-slide-in'}`}>
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              Xác nhận xóa ({timeLeft}s)
            </h4>
            <p className="text-sm text-gray-600 mb-3">{message}</p>
            
            <div className="flex space-x-2">
              <button
                onClick={onCancel}
                className="px-3 py-1 text-xs border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={onConfirm}
                className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
          
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmToast;
