
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCartState } from "@/app/hooks/useCartState";
import { useAuth } from "@/app/contexts/AuthContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // Sử dụng custom hook để tránh hydration mismatch
  const { totalQuantity, isLoaded } = useCartState();
  const { user, logout, isLoading } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-lg shadow-black/5">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/fresh-garden-logo.png" alt="Logo" className="h-10 w-auto min-w-[300px]" style={{ background: 'transparent', boxShadow: 'none', borderRadius: 0 }} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ">
            {[{ label: 'Trang chủ', href: '/' },{ label: 'Shop', href: '/Shop' }, { label: 'Giới thiệu', href: '#' }, { label: 'Dịch vụ', href: '#' } , { label: 'Liên hệ', href: '#' }].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-green-700 font-medium transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Icon search */}
            {(!user || user.role !== 'admin') && (
              <button className="hidden md:block p-2 rounded-full hover:bg-green-100 transition">
                {/* Heroicons Outline - Search */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-700">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth={2} strokeLinecap="round" />
                </svg>
              </button>
            )}
            {/* Icon cart */}
            {(!user || user.role !== 'admin') && (
              <Link 
                href="/cart" 
                className="relative hidden md:block"
                prefetch={true}
              >
                <button className="p-2 rounded-full hover:bg-green-100 transition">
                  {/* Heroicons Outline - Shopping Cart */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                  </svg>
                </button>
                {isLoaded && totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            )}
            {/* User Menu */}
            <div className="hidden md:block relative">
              {!isLoading && user ? (
                <div className="relative">
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-green-100 transition"
                  >
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                      </span>
                    </div>
                    {/* Hiển thị username trên header */}
                    <span className="text-gray-900 font-semibold text-base">
                      {user.username || user.email || ''}
                    </span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Thông tin cá nhân
                      </Link>
                      {user.role !== 'admin' && (
                        <Link
                          href="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Đơn hàng của tôi
                        </Link>
                      )}
                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="block"
                  prefetch={true}
                >
                  <button className="p-2 rounded-full hover:bg-green-100 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-700">
                      <circle cx="12" cy="8" r="4" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-4 8-4 8-4s8 0 8 4" />
                    </svg>
                  </button>
                </Link>
              )}
            </div>
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden ${mobileMenuOpen ? '' : 'hidden'} absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-lg animate-slide-down`}
        >
          <div className="px-4 py-6 space-y-4">
            {[{ label: 'Home', href: '/' }, { label: 'Shop', href: '/Shop' }, { label: 'About', href: '#' }, { label: 'Services', href: '#' }, { label: 'Contact', href: '#' }].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg mt-4">
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
