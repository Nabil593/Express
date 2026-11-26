export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
  role?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
