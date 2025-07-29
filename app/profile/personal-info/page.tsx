'use client';

import React from 'react';
import { usePersonalInfoLogic } from '../../hooks/user/usePersonalInfoLogic';
import PersonalInfoHeader from './components/PersonalInfoHeader';
import AvatarSection from './components/AvatarSection';
import BasicInfoSection from './components/BasicInfoSection';
import AddressSection from './components/AddressSection';
import AccountInfoSection from './components/AccountInfoSection';
import LoadingSpinner from './components/LoadingSpinner';

export default function PersonalInfoPage() {
  const {
    user,
    formData,
    isLoading,
    isEditing,
    handleInputChange,
    handleSubmit,
    handleCancel,
    handleEdit,
    handleDeleteAccount
  } = usePersonalInfoLogic();

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PersonalInfoHeader
          isEditing={isEditing}
          isLoading={isLoading}
          onEdit={handleEdit}
          onCancel={handleCancel}
        />

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm">
          <form id="personal-info-form" onSubmit={handleSubmit} className="p-6 space-y-6">
            <AvatarSection
              avatar={formData.avatar}
              isEditing={isEditing}
              onChange={handleInputChange}
            />

            <BasicInfoSection
              formData={{
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone
              }}
              isEditing={isEditing}
              onChange={handleInputChange}
            />

            <AddressSection
              formData={{
                address: formData.address,
                city: formData.city,
                district: formData.district,
                ward: formData.ward
              }}
              isEditing={isEditing}
              onChange={handleInputChange}
            />

            <AccountInfoSection user={user} onDeleteAccount={handleDeleteAccount} isLoading={isLoading} />
          </form>
        </div>
      </div>
    </div>
  );
}
