'use client';
import React, { useState } from 'react';

interface OrderNotesFormProps {
  onNotesChange: (notes: string) => void;
}

const OrderNotesForm: React.FC<OrderNotesFormProps> = ({ onNotesChange }) => {
  const [notes, setNotes] = useState<string>('');

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNotes(value);
    onNotesChange(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Ghi chú đơn hàng</h2>
      <textarea
        name="notes"
        value={notes}
        onChange={handleNotesChange}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
        placeholder="Ghi chú thêm cho đơn hàng (tùy chọn)"
      />
    </div>
  );
};

export default OrderNotesForm;
