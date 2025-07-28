// Shared types for Cart and Checkout functionality

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug?: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

export interface OrderData {
  customerInfo: CustomerInfo;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    slug?: string;
  }>;
  shippingFee: number;
  paymentMethod: string;
  notes?: string;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type PaymentMethod = 'cod' | 'bank_transfer' | 'momo';
