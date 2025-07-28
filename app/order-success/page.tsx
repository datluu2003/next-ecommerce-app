"use client";
import React, { Suspense } from 'react';
import OrderSuccessContent from './components/OrderSuccessContent';

function OrderSuccessLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-200 rounded-full"></div>
            <div className="h-8 bg-gray-200 rounded mb-4 mx-auto w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-6 mx-auto w-2/3"></div>
            <div className="h-20 bg-gray-200 rounded mb-6"></div>
            <div className="h-12 bg-gray-200 rounded mb-3"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessLoading />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
