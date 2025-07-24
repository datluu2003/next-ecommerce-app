'use client';
import React from 'react';
import CartItemComponent from './CartItem';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug?: string;
}

interface CartItemsListProps {
  items: CartItem[];
  onQuantityChange: (id: string, newQuantity: number) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onClearCart: () => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({
  items,
  onQuantityChange,
  onIncrease,
  onDecrease,
  onRemove,
  onClearCart
}) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Sản phẩm</h2>
          <button
            onClick={onClearCart}
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
              onQuantityChange={onQuantityChange}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartItemsList;
