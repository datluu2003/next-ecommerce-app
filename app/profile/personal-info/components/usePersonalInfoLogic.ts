'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useUniversalToast } from '../../../hooks/useUniversalToast';

interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  avatar: string;
}

export const usePersonalInfoLogic = () => {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const { showToast } = useUniversalToast();
  
  const [formData, setFormData] = useState<PersonalInfoForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    avatar: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load user data khi component mount
  useEffect(() => {
    if (user) {
      // Parse username thành firstName và lastName
      const nameParts = user.username?.split(' ') || ['', ''];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      setFormData({
        firstName: String(firstName || ''),
        lastName: String(lastName || ''),
        email: String(user.email || ''),
        phone: String(user.phone_number || ''),
        address: String(user.address || ''),
        city: '',
        district: '',
        ward: '',
        avatar: String(user.avatar || '')
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showToast({
          type: 'error',
          title: 'Lỗi xác thực',
          message: 'Vui lòng đăng nhập lại'
        });
        router.push('/auth/login');
        return;
      }

      // Kiểm tra dữ liệu bắt buộc
      if (!String(formData.firstName || '').trim() || !String(formData.lastName || '').trim() || !String(formData.email || '').trim()) {
        throw new Error('Vui lòng điền đầy đủ thông tin bắt buộc (Họ, Tên, Email)');
      }

      // Chuẩn bị data để gửi lên server
      const updateData = {
        firstName: String(formData.firstName || '').trim(),
        lastName: String(formData.lastName || '').trim(),
        email: String(formData.email || '').trim(),
        phone: String(formData.phone || '').trim(),
        address: String(formData.address || '').trim(),
        avatar: String(formData.avatar || '').trim()
      };

      const response = await fetch('http://localhost:8080/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.message || `HTTP Error: ${response.status}`);
        } catch {
          throw new Error(`HTTP Error ${response.status}: ${errorText}`);
        }
      }
      
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP Error: ${response.status}`);
      }

      if (!result.status) {
        throw new Error(result.message || 'API trả về status = false');
      }

      // Cập nhật user trong context
      updateUser(result.data);
      showToast({
        type: 'success',
        title: 'Thành công',
        message: 'Cập nhật thông tin thành công!'
      });
      setIsEditing(false);
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Lỗi',
        message: error instanceof Error ? error.message : 'Có lỗi trong quá trình kiểm tra dữ liệu'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form về dữ liệu gốc
    if (user) {
      const nameParts = user.username?.split(' ') || ['', ''];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      setFormData({
        firstName: String(firstName || ''),
        lastName: String(lastName || ''),
        email: String(user.email || ''),
        phone: String(user.phone_number || ''),
        address: String(user.address || ''),
        city: '',
        district: '',
        ward: '',
        avatar: String(user.avatar || '')
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return {
    user,
    formData,
    isLoading,
    isEditing,
    handleInputChange,
    handleSubmit,
    handleCancel,
    handleEdit
  };
};
