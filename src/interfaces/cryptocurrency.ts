export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date | string;
  atl: number;
  atl_change_percentage: number;
  atl_date: Date | string;
  roi: Roi | null;
  last_updated: Date | string;
}

export interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

export interface ListCryptocurrenciesProps {
  cryptocurrencies: CryptoData[];
}
export interface ListCryptoManageProps {
  cryptocurrencies: Partial<CryptoData>[];
}

export interface TotalCashProps {
  amount: string;
  percentage: string;
  isPositive: boolean;
  onRefresh: () => void;
}
