"use client";
import React from 'react';
import { useCartState } from '@/app/hooks/useCartState';

// Import components
import CartLoadingState from './components/CartLoadingState';
import CartEmptyState from './components/CartEmptyState';
import CartHeader from './components/CartHeader';
import CartItemsList from './components/CartItemsList';
import CartSummary from './components/CartSummary';

export default function CartPage() {
  const { items, totalQuantity, totalAmount, isLoaded } = useCartState();

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
          <CartItemsList items={items} />

          <CartSummary
            totalQuantity={totalQuantity}
            totalAmount={totalAmount}
          />
        </div>
      </div>
    </div>
  );
}
