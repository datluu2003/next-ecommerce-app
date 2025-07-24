"use client";
import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useCartState } from '@/app/hooks/useCartState';
import { useSimpleToast } from '@/app/hooks/useSimpleToast';
import ConfirmToast from '@/app/components/ConfirmToast';
import SimpleToast from '@/app/components/SimpleToast';
import { removeFromCart, updateQuantity, increaseQuantity, decreaseQuantity, clearCart } from '@/features/cart/cartSlice';

// Import components
import CartLoadingState from './components/CartLoadingState';
import CartEmptyState from './components/CartEmptyState';
import CartHeader from './components/CartHeader';
import CartItemsList from './components/CartItemsList';
import CartSummary from './components/CartSummary';

export default function CartPage() {
  const { items, totalQuantity, totalAmount, isLoaded } = useCartState();
  const dispatch = useAppDispatch();
  
  const { toastMessage, toastType, showToast, hideToast } = useSimpleToast();
  
  // State cho confirmation toast
  const [showConfirmToast, setShowConfirmToast] = React.useState(false);

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  // Xử lý tăng số lượng
  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  // Xử lý giảm số lượng
  const handleDecrease = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item && item.quantity === 1) {
      // Nếu số lượng = 1 thì sẽ xóa sản phẩm, hiển thị toast
      showToast(`Đã xóa "${item.name}" khỏi giỏ hàng`, 'warning');
    }
    dispatch(decreaseQuantity(id));
  };

  // Xử lý xóa sản phẩm
  const handleRemove = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item) {
      dispatch(removeFromCart(id));
      showToast(`Đã xóa "${item.name}" khỏi giỏ hàng`, 'error');
    }
  };

  // Xử lý xóa tất cả
  const handleClearCart = () => {
    setShowConfirmToast(true);
  };

  // Xác nhận xóa tất cả
  const confirmClearCart = () => {
    const itemCount = items.length;
    dispatch(clearCart());
    setShowConfirmToast(false);
    showToast(`Đã xóa tất cả ${itemCount} sản phẩm khỏi giỏ hàng`, 'error');
  };

  // Hủy xóa tất cả
  const cancelClearCart = () => {
    setShowConfirmToast(false);
  };

  // Hiển thị loading trong khi đang load cart từ localStorage
  if (!isLoaded) {
    return <CartLoadingState />;
  }

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CartHeader totalQuantity={totalQuantity} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CartItemsList
            items={items}
            onQuantityChange={handleQuantityChange}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
            onClearCart={handleClearCart}
          />

          <CartSummary
            totalQuantity={totalQuantity}
            totalAmount={totalAmount}
          />
        </div>
      </div>
      
      {/* Simple Toast */}
      <SimpleToast 
        message={toastMessage}
        type={toastType}
        onClose={hideToast}
      />
      
      {/* Confirm Toast */}
      <ConfirmToast 
        isVisible={showConfirmToast}
        message="Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?"
        onConfirm={confirmClearCart}
        onCancel={cancelClearCart}
      />
    </div>
  );
}
