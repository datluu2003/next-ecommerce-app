"use client";
import React from "react";

export default function AdminFooter() {
  return (
    <footer className="bg-gray-900 text-white py-4 px-8 text-center mt-auto">
      <span> {new Date().getFullYear()} Admin Panel - Powered by Next.js</span>
    </footer>
  );
}
