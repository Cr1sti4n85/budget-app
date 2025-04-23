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

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const login = async (data: LoginData): Promise<AxiosResponse> =>
  API.post<LoginData>('/auth/signin', data);

export const register = async (data: RegisterData): Promise<AxiosResponse> =>
  API.post<RegisterData>('/user', data);

export const getUser = async (): Promise<User | unknown> =>
  API.get<User>('/user/profile');

//Categories

interface Category {
  title: string;
}

export const getCategories = async (): Promise<AxiosResponse> =>
  API.get('/category');

export const createCategory = async (data: Category): Promise<AxiosResponse> =>
  API.post('/category', data);

export const updateCategory = async (
  data: Category,
  id: string,
): Promise<AxiosResponse> => API.patch(`/category/${id}`, data);

export const deleteCategory = async (id: string): Promise<AxiosResponse> =>
  API.delete(`/category/${id}`);
