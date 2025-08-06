'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const EyeIcon = ({ show }: { show: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-5 h-5 text-gray-500"
  >
    {show ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 012.1 12c2.1-4.2 6.3-7 10.8-7s8.7 2.8 10.8 7a10.05 10.05 0 01-11.775 6.825M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M9.88 9.88A3 3 0 0112 9c1.66 0 3 1.34 3 3 0 .53-.14 1.03-.38 1.46M6.1 6.1C4.3 7.9 3 10.3 3 12c2.1 4.2 6.3 7 10.8 7 1.61 0 3.16-.31 4.58-.88M17.9 17.9C19.7 16.1 21 13.7 21 12c-2.1-4.2-6.3-7-10.8-7-1.61 0-3.16.31-4.58.88" />
    )}
  </svg>
);

const ResetPasswordForm: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [token, setToken] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!token) {
      setError('Vui lòng nhập mã xác thực.');
      return;
    }
    if (!newPassword || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8080/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, resetToken: token, newPassword }),
      });
      const data = await res.json();
      if (data.status) {
        setSuccess(true);
      } else {
        setError(data.message || 'Đã xảy ra lỗi.');
      }
    } catch {
      setError('Đã xảy ra lỗi hệ thống.');
    }
    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Đổi mật khẩu thành công!</h2>
          <p className="mt-2 text-gray-600">Bạn có thể đăng nhập bằng mật khẩu mới.</p>
          <Link href="/login" className="mt-6 w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Đặt lại mật khẩu</h2>
          <p className="mt-2 text-gray-600">Nhập mật khẩu mới cho tài khoản <span className="font-medium">{email}</span></p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="token" className="block text-sm font-medium text-gray-700">Mã xác thực</label>
            <input
              id="token"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md text-black shadow-sm focus:ring-green-500 focus:border-green-500"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="Nhập mã xác thực từ email"
            />
          </div>
          <div className="relative">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md text-black shadow-sm focus:ring-green-500 focus:border-green-500 pr-10"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-9 bg-transparent"
              onClick={() => setShowNewPassword(v => !v)}
            >
              <EyeIcon show={showNewPassword} />
            </button>
          </div>
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md text-black shadow-sm focus:ring-green-500 focus:border-green-500 pr-10"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-9 bg-transparent"
              onClick={() => setShowConfirmPassword(v => !v)}
            >
              <EyeIcon show={showConfirmPassword} />
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            {isLoading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
          </button>
        </form>
        <div className="text-center mt-4">
          <Link href="/login" className="text-green-600 hover:underline text-sm">Quay lại đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;