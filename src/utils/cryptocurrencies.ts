import axios from 'axios';
import { CryptoData, PriceDataProps, CryptoDataIProps } from '../interfaces';

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

export const fetchPriceData = async (crypto: CryptoData): Promise<PriceDataProps[]> => {
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart`,
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

export const fetchCryptoCompareData = async (
  currency: string,
): Promise<CryptoDataIProps<typeof currency>> => {
  try {
    const { data } = await axios(
      `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=${currency}`,
    );

    return data.Data as CryptoDataIProps<typeof currency>;
  } catch (error) {
    throw new Error(`Error obtaining cryptocurrencies: ${error}`);
  }
};
