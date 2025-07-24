"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { useCartState } from '@/app/hooks/useCartState';
import { useSimpleToast } from '@/app/hooks/useSimpleToast';
import SimpleToast from '@/app/components/SimpleToast';
import { clearCart } from '@/features/cart/cartSlice';

// Import components
import CheckoutLoadingState from './components/CheckoutLoadingState';
import CheckoutHeader from './components/CheckoutHeader';
import CustomerInfoForm from './components/CustomerInfoForm';
import PaymentMethodForm from './components/PaymentMethodForm';
import OrderNotesForm from './components/OrderNotesForm';
import OrderSummary from './components/OrderSummary';

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

export default function CheckoutPage() {
  const { items, totalQuantity, totalAmount, isLoaded } = useCartState();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toastMessage, toastType, showToast, hideToast } = useSimpleToast();
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState<string>('cod');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const shippingFee = 0; // Miễn phí vận chuyển
  const finalAmount = totalAmount + shippingFee;

  // Redirect nếu giỏ hàng trống
  if (isLoaded && items.length === 0) {
    router.push('/cart');
    return null;
  }

  // Xử lý thay đổi thông tin khách hàng
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'notes') {
      setNotes(value);
    } else {
      setCustomerInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const required = ['name', 'email', 'phone', 'address', 'city', 'district', 'ward'];
    for (const field of required) {
      if (!customerInfo[field as keyof CustomerInfo]) {
        showToast(`Vui lòng điền ${field}`, 'error');
        return false;
      }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      showToast('Email không hợp lệ', 'error');
      return false;
    }
    
    // Validate phone
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(customerInfo.phone)) {
      showToast('Số điện thoại không hợp lệ', 'error');
      return false;
    }
    
    return true;
  };

  // Xử lý đặt hàng
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const orderData = {
        customerInfo,
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          slug: item.slug
        })),
        shippingFee,
        paymentMethod,
        notes: notes.trim() || undefined
      };

      const response = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
        // Clear cart sau khi đặt hàng thành công
        dispatch(clearCart());
        
        showToast('Đặt hàng thành công!', 'success');
        
        // Redirect đến trang cảm ơn
        setTimeout(() => {
          router.push(`/order-success?orderNumber=${result.data.orderNumber}`);
        }, 2000);
      } else {
        showToast(result.message || 'Có lỗi xảy ra khi đặt hàng', 'error');
      }
    } catch (error) {
      console.error('Lỗi đặt hàng:', error);
      showToast('Không thể kết nối đến server', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return <CheckoutLoadingState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CheckoutHeader />

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form thông tin */}
            <div className="lg:col-span-2 space-y-6">
              <CustomerInfoForm 
                customerInfo={customerInfo}
                onInputChange={handleInputChange}
              />

              <PaymentMethodForm 
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
              />

              <OrderNotesForm 
                notes={notes}
                onNotesChange={handleInputChange}
              />
            </div>

            <OrderSummary 
              items={items}
              totalQuantity={totalQuantity}
              totalAmount={totalAmount}
              finalAmount={finalAmount}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </div>
      
      {/* Simple Toast */}
      <SimpleToast 
        message={toastMessage}
        type={toastType}
        onClose={hideToast}
      />
    </div>
  );
}
