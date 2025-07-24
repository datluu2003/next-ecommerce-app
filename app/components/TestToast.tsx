'use client';
import React from 'react';

interface TestToastProps {
  message: string | null;
  onClose: () => void;
}

const TestToast: React.FC<TestToastProps> = ({ message, onClose }) => {
  console.log('TestToast render - message:', message);
  
  if (!message) {
    console.log('TestToast: No message, returning null');
    return null;
  }

  return (
    <div 
      className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded shadow-lg"
      onClick={onClose}
    >
      <p>{message}</p>
    </div>
  );
};

export default TestToast;
