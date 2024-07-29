import axios from 'axios';
import { useStoreAutheticated } from '../stores/authentication';
import { useStorePaymentMethods } from '../stores/paymentMethods';

const { VITE_API_BASE_URL } = import.meta.env;

export const instanceAxios = axios.create({
  baseURL: VITE_API_BASE_URL,
  withCredentials: true,
});

instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
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
