'use client';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';

export const useCartState = () => {
  const [isClient, setIsClient] = useState(false);
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Trả về cart state chỉ khi đã mount trên client
  return {
    ...cart,
    isLoaded: isClient
  };
};
