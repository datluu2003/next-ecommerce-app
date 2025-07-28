'use client';

import React from 'react';
import Image from 'next/image';

interface AvatarSectionProps {
  avatar: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AvatarSection({ avatar, isEditing, onChange }: AvatarSectionProps) {
  return (
    <div className="flex items-center space-x-6">
      <div className="flex-shrink-0">
        <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          {avatar ? (
            <Image 
              src={avatar} 
              alt="Avatar" 
              width={80}
              height={80}
              className="h-full w-full object-cover" 
            />
          ) : (
            <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </div>
      </div>
      
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ảnh đại diện
        </label>
        <input
          type="url"
          name="avatar"
          value={avatar}
          onChange={onChange}
          disabled={!isEditing}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-black"
        />
      </div>
    </div>
  );
}
