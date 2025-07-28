import api from '@/shared/libs/api/axios';

import { ProfilePatch } from '../types/types';

export const getMe = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const editMe = async (payload: ProfilePatch) => {
  const response = await api.patch('/users/me', payload);
  return response.data;
};

export const editImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post('/users/me/image', formData);
  return response.data;
};
