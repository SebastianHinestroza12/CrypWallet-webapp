import { instanceAxios } from '../utils';
import { DataRegisterProps, UserIProps } from '../interfaces';
import { AxiosError } from 'axios';

export const registerUser = async (formData: DataRegisterProps) => {
  try {
    const { status, data } = await instanceAxios.post('/auth/register', formData);
    return { status, data };
  } catch (error) {
    const serverError = error as AxiosError;
    throw serverError;
  }
};

export const loginUser = async ({ email, password }: UserIProps) => {
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
};
