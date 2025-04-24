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

export interface User {
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

export const getUser = async (): Promise<User> => {
  const response = await API.get<User>('/user/profile');
  return response.data;
};
// export const getUser = async (): Promise<AxiosResponse> =>
//   API.get('/user/profile');

export const logout = async (): Promise<AxiosResponse> =>
  API.get('/auth/logout');

//Categories

export interface CreateCategory {
  title: string;
}

export interface CategoryDto extends CreateCategory {
  id: string;
  transactions: Transaction[];
}

export const getCategories = async (): Promise<CategoryDto[]> => {
  const response = await API.get<CategoryDto[]>('/category');
  return response.data;
};

export const createCategory = async (
  data: CreateCategory,
): Promise<CategoryDto> => {
  const response = await API.post<CategoryDto>('/category', data);
  return response.data;
};
// API.post('/category', data);

export const updateCategory = async (
  data: CreateCategory,
  id: string,
): Promise<CategoryDto> => {
  const response = await API.patch<CategoryDto>(`/category/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id: string): Promise<AxiosResponse> =>
  API.delete(`/category/${id}`);

//Transactions

interface Transaction {
  id: number;
  title: string;
  amount: number;
  date: string;
  categoryId: number;
  category: CategoryDto;
}
