'use client';

import React from 'react';

interface AddressSectionProps {
  formData: {
    address: string;
    city: string;
    district: string;
    ward: string;
  };
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function AddressSection({ formData, isEditing, onChange }: AddressSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Địa chỉ</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Địa chỉ chi tiết
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={onChange}
          disabled={!isEditing}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-black"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thành phố/Tỉnh
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quận/Huyện
          </label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phường/Xã
          </label>
          <input
            type="text"
            name="ward"
            value={formData.ward}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-black"
          />
        </div>
      </div>
    </div>
  );
}
