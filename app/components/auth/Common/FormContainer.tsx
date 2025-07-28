'use client';
import React from 'react';

interface FormContainerProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

const FormContainer: React.FC<FormContainerProps> = ({ children, onSubmit }) => {
  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {children}
      </div>
    </form>
  );
};

export default FormContainer;
