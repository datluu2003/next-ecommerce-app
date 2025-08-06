'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AuthHeader from '@/app/components/auth/Common/AuthHeader';
import InputField from '@/app/components/auth/Common/InputField';
import SubmitButton from '@/app/components/auth/Common/SubmitButton';
import FormContainer from '@/app/components/auth/Common/FormContainer';
import { useAuth } from '@/app/contexts/AuthContext';
interface ForgotPasswordFormData {
  email: string;
}

const ForgotPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ''
  });
  const [errors, setErrors] = useState<Partial<ForgotPasswordFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword } = useAuth(); // Sử dụng useAuth


  const validateForm = (): boolean => {
    const newErrors: Partial<ForgotPasswordFormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof ForgotPasswordFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await forgotPassword(formData.email); // Gọi API thực sự
        setIsSubmitted(true);
      } catch (error) {
        console.error('Forgot password failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Email đã được gửi!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email <span className="font-medium">{formData.email}</span>
            </p>
            <div className="mt-6">
              <Link
                href="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthHeader
          title="Quên mật khẩu"
          subtitle="Nhập email để nhận hướng dẫn đặt lại mật khẩu, hoặc"
          linkText="quay lại đăng nhập"
          linkHref="/login"
          iconType="login"
        />

        <FormContainer onSubmit={handleSubmit}>
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Nhập email của bạn"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            icon={
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            }
          />

          <SubmitButton
            isLoading={isLoading}
            text="Gửi hướng dẫn"
            loadingText="Đang gửi..."
            type="login"
          />
        </FormContainer>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
