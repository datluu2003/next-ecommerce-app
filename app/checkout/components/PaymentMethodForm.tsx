'use client';
import React from 'react';

interface PaymentMethodFormProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ 
  paymentMethod, 
  onPaymentMethodChange 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Phương thức thanh toán</h2>
      
      <div className="space-y-3">
        <label className="flex items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={(e) => onPaymentMethodChange(e.target.value)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">
            Thanh toán khi nhận hàng (COD)
          </span>
        </label>
        
        <label className="flex items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="bank_transfer"
            checked={paymentMethod === 'bank_transfer'}
            onChange={(e) => onPaymentMethodChange(e.target.value)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">
            Chuyển khoản ngân hàng
          </span>
        </label>
        
        <label className="flex items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="momo"
            checked={paymentMethod === 'momo'}
            onChange={(e) => onPaymentMethodChange(e.target.value)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">
            Ví MoMo
          </span>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethodForm;
