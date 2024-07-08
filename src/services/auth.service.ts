import { instanceAxios } from '../utils';
import { DataRegisterProps, UserIProps, UserProps } from '../interfaces';
import { AxiosError } from 'axios';

export class AuthService {
  private static handleAxiosError(error: unknown): never {
    const serverError = error as AxiosError;
    throw serverError;
  }

  static async registerUser(formData: DataRegisterProps) {
    try {
      const { status, data } = await instanceAxios.post('/auth/register', formData);
      return { status, data };
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  static async loginUser({ email, password }: UserIProps) {
    try {
      const response = await instanceAxios.post('/auth/login', { email, password });
      return response;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  static async logout() {
    try {
      await instanceAxios.post('/auth/logout');
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  static async updateProfile(data: UserProps, userId: string) {
    try {
      return await instanceAxios.put(`/auth/profile/update/${userId}`, data);
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  static async generateOTP(data: { email: string }) {
    try {
      return await instanceAxios.post('/auth/generate-otp', data);
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  static async verifyOTP(data: { otp: string }, userId: string) {
    try {
      return await instanceAxios.post(`/auth/${userId}/verify-otp`, data);
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  static async forgotPassword(userId: string, data: { newPassword: string }) {
    try {
      return await instanceAxios.patch(`/auth/users/${userId}/update-password`, data);
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  static async checkWords(data: { userId: string; words: string[] }) {
    try {
      return await instanceAxios.post('/auth/verify-safe-words', data);
    } catch (error) {
      this.handleAxiosError(error);
    }
  }
}
