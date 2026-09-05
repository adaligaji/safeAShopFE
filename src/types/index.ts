export type Role = 'CUSTOMER' | 'ADMIN';

export interface User {
  id: number;
  username: string;
  role: Role;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product?: Product;
}
