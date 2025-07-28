// Main layout wrapper for the app
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-5 px-4">{children}</main>
      <Footer />
    </div>
  );
};
