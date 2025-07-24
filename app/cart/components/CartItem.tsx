'use client';
import React from 'react';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug?: string;
}

interface CartItemProps {
  item: CartItem;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onIncrease,
  onDecrease,
  onRemove
}) => {
  return (
    <div className="p-6">
      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </div>
        
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {item.slug ? (
              <Link 
                href={`/products/${item.slug}`}
                className="hover:text-green-600 transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              item.name
            )}
          </h3>
          <p className="text-green-600 font-bold text-lg">
            {item.price.toLocaleString()} VND
          </p>
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onDecrease(item.id)}
            className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
          </button>
          
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value) || 1)}
            className="w-16 text-center border border-gray-400 rounded-md px-2 py-1 text-black font-medium focus:border-gray-600 focus:outline-none"
          />
          
          <button
            onClick={() => onIncrease(item.id)}
            className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
        
        {/* Remove Button */}
        <button
          onClick={() => onRemove(item.id)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
      
      {/* Subtotal */}
      <div className="mt-4 text-right">
        <span className="text-lg font-semibold text-gray-900">
          Tổng: {(item.price * item.quantity).toLocaleString()} VND
        </span>
      </div>
    </div>
  );
};

export default CartItemComponent;
