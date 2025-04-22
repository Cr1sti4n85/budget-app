import { AxiosResponse } from 'axios';
import API from '../config/apiClient';
// import { Session } from "../types";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  confirmPassword: string;
}

export const login = async (data: LoginData): Promise<AxiosResponse> =>
  API.post('/auth/signin', data);

export const register = async (data: RegisterData): Promise<AxiosResponse> =>
  API.post('/user', data);
