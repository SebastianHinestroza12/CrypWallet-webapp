import { ChartArea, PriceDataProps, CryptoData } from '../interfaces';
import { ScriptableContext, Plugin } from 'chart.js';

let width: number, height: number, gradient: CanvasGradient;

export const getGradient = (
  ctx: CanvasRenderingContext2D,
  chartArea: ChartArea,
): CanvasGradient => {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'blue');
    gradient.addColorStop(0.5, 'red');
    gradient.addColorStop(1, 'orange');
  }

  return gradient;
};

export const chartAreaBorder: Plugin = {
  id: 'chartAreaBorder',
  beforeDraw(chart) {
    const { ctx, chartArea } = chart;
    ctx.save();
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.lineDashOffset = 2;
    ctx.strokeRect(
      chartArea.left,
      chartArea.top,
      chartArea.right - chartArea.left,
      chartArea.bottom - chartArea.top,
    );
    ctx.restore();
  },
};

export const chartData = (priceData: PriceDataProps[]) => {
  const chartData = {
    type: 'line',
    labels: priceData.map((data) => data.date),
    datasets: [
      {
        label: 'Precio (USD)',
        data: priceData.map((data) => data.price),
        borderWidth: 1,
        fill: true,
        radius: 0,
        backgroundColor: '#1e59ea',
        borderColor: (context: ScriptableContext<'line'>) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }
          return getGradient(ctx, chartArea);
        },
      },
    ],
  };

  return chartData;
};

export const chartOptions = (crypto: CryptoData) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Precio de ${crypto.name} en los últimos 7 días`,
      },
      chartAreaBorder: {
        borderColor: 'gray',
        borderWidth: 2,
        borderDash: [5, 5],
        borderDashOffset: 2,
      },
    },
    maintainAspectRatio: false,
  };

  return chartOptions;
};
