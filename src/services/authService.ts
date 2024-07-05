import { instanceAxios } from '../utils';
import { DataRegisterProps, UserIProps, UserProps } from '../interfaces';
import { AxiosError } from 'axios';

export class AuthService {
  static async registerUser(formData: DataRegisterProps) {
    try {
      const { status, data } = await instanceAxios.post('/auth/register', formData);
      return { status, data };
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }

  static async loginUser({ email, password }: UserIProps) {
    try {
      const response = await instanceAxios.post('/auth/login', {
        email,
        password,
      });
      return response;
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }

  static async logout() {
    try {
      await instanceAxios.post('/auth/logout');
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }

  static async updateProfile(data: UserProps, userId: string) {
    try {
      return await instanceAxios.put(`/auth/profile/update/${userId}`, data);
    } catch (error) {
      const serverError = error as AxiosError;
      throw serverError;
    }
  }
}
