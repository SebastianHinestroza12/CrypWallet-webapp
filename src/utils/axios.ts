import axios from 'axios';
import { useStoreAutheticated } from '../stores/authentication';
import { useStorePaymentMethods } from '../stores/paymentMethods';

const { VITE_API_BASE_URL } = import.meta.env;

export const instanceAxios = axios.create({
  baseURL: VITE_API_BASE_URL,
});

instanceAxios.interceptors.request.use(
  (config) => {
    const token = useStoreAutheticated.getState().token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      status,
      data: { message },
    } = error.response;
    if (
      status === 401 &&
      (message === 'Unauthorized access' || message === 'Access denied. No token provided.')
    ) {
      setTimeout(() => {
        const setSaveDataPayment = useStorePaymentMethods.getState().setSaveDataPayment;
        setSaveDataPayment(null);

        const sessionExpired = useStoreAutheticated.getState().sessionExpired;

        sessionExpired();
      }, 1000);

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
