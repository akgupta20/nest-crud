export interface IUser {
  id: number;
  first_name: string;
  last_name?: string;
  email: string;
  phone_no: string;
  password: string;
  isActive: boolean;
  role: string;
  gender?: string;
  age?: number;
  address?: string;
  occupation?: string;
}
