import React from 'react';

interface ActionButtonsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
  totalPrice: number;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onAddToCart, onBuyNow }) => (
  <div className="flex flex-col md:flex-row items-center w-full mt-8 gap-4">
    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto flex-1">
      <button
        className="w-full md:w-auto bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        onClick={onAddToCart}
      >
        Thêm vào giỏ hàng
      </button>
      <button
        className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={onBuyNow}
      >
        Mua ngay
      </button>
    </div>
  </div>
);

export default ActionButtons; 