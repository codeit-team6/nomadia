import api from '../../../shared/libs/api/axios';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from '../types/auth.types';

//로그인 api
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(`auth/login`, data);
  return response.data;
};

//회원가입 api
export const signup = async (data: SignupRequest): Promise<void> => {
  await api.post('users', data);
};

//리프레시 토큰을 통한 accessToken 재발급
export const refreshToken = async (token: string) => {
  const response = await api.post('/auth/tokens', { refreshToken: token });
  return response.data;
};

//리프레시토큰 테스트용 api
export const getMe = async () => {
  const response = await api.get('/users/me');
  return response.data;
};
