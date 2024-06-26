import axios from 'axios';

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
