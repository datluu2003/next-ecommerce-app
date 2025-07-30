'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import AuthHeader from '@/app/components/auth/Common/AuthHeader';
import InputField from '@/app/components/auth/Common/InputField';
import SubmitButton from '@/app/components/auth/Common/SubmitButton';
import FormContainer from '@/app/components/auth/Common/FormContainer';
import SocialAuth from '@/app/components/auth/Common/SocialAuth';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: React.FC = () => {
  // ...existing code...
  // ...existing code...
  const router = useRouter();
  const { login, user } = useAuth();
  React.useEffect(() => {
    if (user?.role === 'admin') {
      console.log('User là admin, chuyển hướng sang admin:', user);
      window.location.href = 'http://localhost:3000';
    }
  }, [user]);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      console.log('User sau login:', user);
      if (user?.role !== 'admin') {
        router.push('/');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Đăng nhập thất bại';
      setErrors({ email: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    // TODO: Implement Google OAuth
    console.log('Google Auth clicked');
  };

  const handleFacebookAuth = () => {
    // TODO: Implement Facebook OAuth
    console.log('Facebook Auth clicked');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthHeader
          title="Đăng nhập tài khoản"
          subtitle="Hoặc"
          linkText="tạo tài khoản mới"
          linkHref="/register"
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

          <InputField
            id="password"
            name="password"
            type="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            showToggle={true}
            onToggle={() => setShowPassword(!showPassword)}
            isVisible={showPassword}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-green-600 hover:text-green-500">
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          <SubmitButton
            isLoading={isLoading}
            text="Đăng nhập"
            loadingText="Đang đăng nhập..."
            type="login"
          />
        </FormContainer>

        <SocialAuth
          text="Hoặc đăng nhập với"
          onGoogleAuth={handleGoogleAuth}
          onFacebookAuth={handleFacebookAuth}
        />
      </div>
    </div>
  );
};

export default LoginForm;
