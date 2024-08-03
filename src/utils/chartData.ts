import { PriceDataProps } from '../interfaces';

export const chartData = (priceData: PriceDataProps[], isPositive: boolean, price: string) => {
  const borderColor = isPositive ? '#17ca56' : '#cf0c07';
  const chartData = {
    type: 'line',
    labels: priceData.map((data) => data.date),
    datasets: [
      {
        label: `${price} (USD)`,
        data: priceData.map((data) => data.price),
        borderWidth: 1,
        fill: true,
        radius: 0,
        backgroundColor: '#1e59ea',
        borderColor,
      },
    ],
  };

  return chartData;
};

export const chartOptions = (text: string) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text,
      },
    },
    maintainAspectRatio: false,
  };

  return chartOptions;
};
