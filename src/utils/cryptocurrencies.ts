/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import axios from 'axios';
import { PriceDataProps, CryptoCompareData, TransactionUserIProps } from '../interfaces';
import { TransactionService } from '../services/transactions.service';

export const fetchCryptoData = async () => {
  try {
    const { data } = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching crypto data: ${error.message}`);
    } else {
      throw new Error(`Error fetching crypto data: ${error}`);
    }
  }
};

export const fetchPriceData = async (crypto: CryptoCompareData): Promise<PriceDataProps[]> => {
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${crypto.CoinInfo.FullName.toLowerCase()}/market_chart`,
      {
        params: {
          vs_currency: 'usd',
          days: 7,
        },
      },
    );

    const formattedPrices: PriceDataProps[] = data.prices.map((price: [number, number]) => ({
      date: new Date(price[0]).toLocaleDateString(),
      price: price[1],
    }));

    return formattedPrices;
  } catch (error) {
    throw new Error(`Error fetching price data: ${error}`);
  }
};

export const fetchCryptoCompareData = async (currency: string): Promise<CryptoCompareData[]> => {
  try {
    const { data } = await axios(
      `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=${currency}`,
    );

    return data.Data;
  } catch (error) {
    throw new Error(`Error obtaining cryptocurrencies: ${error}`);
  }
};

export const fetchDescription = async (symbol: string) => {
  try {
    const { data } = await axios.get(
      `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${symbol}`,
    );
    return data.Data[symbol].Description;
  } catch (error) {
    throw new Error(`Error fetching description: ${error}`);
  }
};

export const translateText = async (text: string, targetLang: string) => {
  try {
    let textTraslate = '';
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`,
    );
    const data = await response.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      data[0].forEach((items) => {
        textTraslate += items[0];
      });
      return { textTraslate, status: 200 };
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Error translating text:', error);
    return null;
  }
};

export const handleNewTransactions = async (
  id: string | null,
  currentTransactions: TransactionUserIProps[],
  setSendNotification: (notification: TransactionUserIProps) => void,
  setTransactions: (transactions: TransactionUserIProps[] | TransactionUserIProps) => void,
) => {
  try {
    const getTransacions = await TransactionService.getAllTransaction(id!);

    if (getTransacions?.status === 200) {
      const response = getTransacions.data.transactions;

      const newTransactions = response.filter(
        (newTransaction: TransactionUserIProps) =>
          !currentTransactions.some(
            (transaction: TransactionUserIProps) => transaction.id === newTransaction.id,
          ),
      );

      const newSendTransactions = newTransactions.filter(
        (transaction: TransactionUserIProps) => transaction.type_transaction === 'Send',
      );

      const isNotEmpty = newSendTransactions.length > 0;

      if (isNotEmpty) {
        newSendTransactions.forEach((element: TransactionUserIProps) => {
          setSendNotification(element);
        });
      }

      setTransactions(response);

      return isNotEmpty;
    }
  } catch (error) {
    console.error(error);
  }
};
