'use client';
import { useState, useCallback } from 'react';

export interface UniversalToastData {
  id: string;
  type: 'add-to-cart' | 'buy-now' | 'remove-item' | 'clear-cart' | 'update-quantity' | 'success' | 'error' | 'warning';
  title: string;
  message: string;
  productName?: string;
  productImage?: string;
  quantity?: number;
  price?: number;
  totalPrice?: number;
  duration?: number; // Thời gian hiển thị (ms)
}

export const useUniversalToast = () => {
  const [toast, setToast] = useState<UniversalToastData | null>(null);

  const showToast = useCallback((toastData: Omit<UniversalToastData, 'id'>) => {
    const newToast: UniversalToastData = {
      id: Date.now().toString(),
      duration: 3000, // Default 3 giây
      ...toastData,
    };
    setToast(newToast);
  }, []);

  const showAddToCartToast = useCallback((
    productName: string,
    productImage: string,
    quantity: number,
    price: number
  ) => {
    const totalPrice = price * quantity;
    showToast({
      type: 'add-to-cart',
      title: 'Đã thêm vào giỏ hàng!',
      message: 'Sản phẩm đã được thêm vào giỏ hàng của bạn',
      productName,
      productImage,
      quantity,
      price,
      totalPrice,
    });
  }, [showToast]);

  const showBuyNowToast = useCallback((
    productName: string,
    productImage: string,
    quantity: number,
    price: number
  ) => {
    const totalPrice = price * quantity;
    showToast({
      type: 'buy-now',
      title: 'Chuyển đến thanh toán!',
      message: 'Đang chuyển đến trang thanh toán...',
      productName,
      productImage,
      quantity,
      price,
      totalPrice,
    });
  }, [showToast]);

  const showRemoveItemToast = useCallback((
    productName: string,
    productImage?: string
  ) => {
    showToast({
      type: 'remove-item',
      title: 'Đã xóa sản phẩm!',
      message: `"${productName}" đã được xóa khỏi giỏ hàng`,
      productName,
      productImage,
      duration: 2500,
    });
  }, [showToast]);

  const showClearCartToast = useCallback((itemCount: number) => {
    showToast({
      type: 'clear-cart',
      title: 'Đã xóa giỏ hàng!',
      message: `Đã xóa tất cả ${itemCount} sản phẩm khỏi giỏ hàng`,
      duration: 2500,
    });
  }, [showToast]);

  const showUpdateQuantityToast = useCallback((
    productName: string,
    newQuantity: number,
    productImage?: string
  ) => {
    showToast({
      type: 'update-quantity',
      title: 'Đã cập nhật!',
      message: `Số lượng "${productName}" đã được cập nhật thành ${newQuantity}`,
      productName,
      productImage,
      quantity: newQuantity,
      duration: 2000,
    });
  }, [showToast]);

  const showSuccessToast = useCallback((title: string, message: string) => {
    showToast({
      type: 'success',
      title,
      message,
    });
  }, [showToast]);

  const showErrorToast = useCallback((title: string, message: string) => {
    showToast({
      type: 'error',
      title,
      message,
    });
  }, [showToast]);

  const showWarningToast = useCallback((title: string, message: string) => {
    showToast({
      type: 'warning',
      title,
      message,
    });
  }, [showToast]);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    toast,
    showToast,
    showAddToCartToast,
    showBuyNowToast,
    showRemoveItemToast,
    showClearCartToast,
    showUpdateQuantityToast,
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    hideToast,
  };
};
