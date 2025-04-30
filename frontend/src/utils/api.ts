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
  username: string;
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
  transactions: TransactionDto[];
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

export interface CreateTransactionDto {
  title: string;
  amount: number;
  type: string;
  category: string;
}

export interface TransactionDto {
  id: string;
  title: string;
  type: string;
  amount: number;
  createdAt: string;
  category: CategoryDto;
  users: User;
}

export const createTransaction = async (
  data: CreateTransactionDto,
): Promise<TransactionDto> => {
  const response = await API.post<TransactionDto>('/transaction', data);
  return response.data;
};

export const getTransactions = async (): Promise<TransactionDto[]> => {
  const response = await API.get<TransactionDto[]>('/transaction');
  return response.data;
};

export const deleteTransaction = async (id: string): Promise<AxiosResponse> =>
  API.delete(`/transaction/${id}`);

export const getPaginatedTransactions = async (
  page: number,
  limit: number,
): Promise<TransactionDto[]> => {
  const response = await API.get<TransactionDto[]>(
    `/transaction/paginate?page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const getTransactionsByType = async (type: string): Promise<number> => {
  const response = await API.get<number>(`/transaction/type/${type}`);
  return response.data;
};
