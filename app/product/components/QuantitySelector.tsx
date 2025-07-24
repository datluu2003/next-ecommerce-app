import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (newQuantity: number) => void;
  children?: React.ReactNode;
}

// Thêm class 'no-spinner' cho input để ẩn spinner trên mọi trình duyệt
const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onChange, children }) => (
  <div className="flex items-center space-x-4 w-full">
    <div className="flex items-center bg-white rounded-lg shadow px-1 py-1">
      <button
        className="w-8 h-8 flex items-center justify-center text-lg font-bold bg-gray-200 rounded-l-lg transition hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-black"
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
      >
        -
      </button>
      <input
        type="number"
        className="w-10 h-8 text-center border-0 outline-none text-base font-semibold text-gray-800 bg-transparent focus:ring-2 focus:ring-green-400 no-spinner"
        value={quantity}
        min={1}
        onChange={e => onChange(Number(e.target.value))}
      />
      <button
        className="w-8 h-8 flex items-center justify-center text-lg font-bold bg-gray-200 rounded-r-lg transition hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-black"
        onClick={() => onChange(quantity + 1)}
      >
        +
      </button>
    </div>
    {children && <div className="ml-4">{children}</div>}
  </div>
);

export default QuantitySelector; 