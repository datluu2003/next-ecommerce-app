'use client';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { loadCart } from '@/features/cart/cartSlice';

export default function CartInitializer() {
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      // Chỉ load cart từ localStorage sau khi component đã mount trên client
      dispatch(loadCart());
    }
  }, [dispatch, isMounted]);

  return null; // Component này không render gì
}
