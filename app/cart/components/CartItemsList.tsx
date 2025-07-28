'use client';
import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useSimpleToast } from '@/app/hooks/useSimpleToast';
import { removeFromCart, updateQuantity, increaseQuantity, decreaseQuantity, clearCart } from '@/features/cart/cartSlice';
import CartItemComponent from './CartItem';
import ConfirmToast from '@/app/components/ConfirmToast';
import SimpleToast from '@/app/components/SimpleToast';
import { CartItem } from '@/app/types/shared';

interface CartItemsListProps {
  items: CartItem[];
}

const CartItemsList: React.FC<CartItemsListProps> = ({
  items
}) => {
  const dispatch = useAppDispatch();
  const { toastMessage, toastType, showToast, hideToast } = useSimpleToast();
  const [showConfirmToast, setShowConfirmToast] = useState(false);

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

  return (
    <>
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Sản phẩm</h2>
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Xóa tất cả
            </button>
          </div>
          
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            ))}
          </div>
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
    </>
  );
};

export default CartItemsList;
