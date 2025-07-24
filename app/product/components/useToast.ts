'use client';
import { useState, useCallback } from 'react';

export interface ToastData {
  id: string;
  type: 'add-to-cart' | 'buy-now';
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastData | null>(null);

  const showAddToCartToast = useCallback((
    productName: string,
    productImage: string,
    quantity: number,
    price: number
  ) => {
    const totalPrice = price * quantity;
    const newToast: ToastData = {
      id: Date.now().toString(),
      type: 'add-to-cart',
      productName,
      productImage,
      quantity,
      price,
      totalPrice,
    };
    setToast(newToast);
  }, []);

  const showBuyNowToast = useCallback((
    productName: string,
    productImage: string,
    quantity: number,
    price: number
  ) => {
    const totalPrice = price * quantity;
    const newToast: ToastData = {
      id: Date.now().toString(),
      type: 'buy-now',
      productName,
      productImage,
      quantity,
      price,
      totalPrice,
    };
    setToast(newToast);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    toast,
    showAddToCartToast,
    showBuyNowToast,
    hideToast,
  };
};
