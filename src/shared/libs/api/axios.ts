import axios from 'axios';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';

const api = axios.create({
  // 추후 baseURL: process.env.000000 설정
  baseURL: 'https://sp-globalnomad-api.vercel.app/15-6',
});

api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
