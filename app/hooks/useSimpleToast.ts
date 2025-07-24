'use client';
import { useState, useCallback } from 'react';

export const useSimpleToast = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('info');

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setToastMessage(message);
    setToastType(type);
  }, []);

  const hideToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  return {
    toastMessage,
    toastType,
    showToast,
    hideToast,
  };
};
