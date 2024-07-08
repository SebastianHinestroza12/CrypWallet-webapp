import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useStoreCrypto } from '../../stores/cryptocurrencies';
import { chartData, chartOptions, fetchPriceData, chartAreaBorder } from '../../utils';
import { PriceDataProps } from '../../interfaces';
import { CryptoNotFound } from '../../components/CryptoNotFound';
import { useToastNotification } from '../../hooks/useToastNotification';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  chartAreaBorder,
);

export const DetailCrypto = () => {
  const { currentCrypto } = useStoreCrypto();
  const { cryptoId } = useParams<{ cryptoId: string }>();
  const crypto = currentCrypto.find((c) => c.CoinInfo.FullName.toLowerCase() === cryptoId);
  const [priceData, setPriceData] = useState<PriceDataProps[]>([]);
  const { displayToast } = useToastNotification();

  useEffect(() => {
    if (crypto) {
      const fetchData = async () => {
        try {
          const data = await fetchPriceData(crypto);
          setPriceData(data);
        } catch (error) {
          displayToast(
            'Límite de API alcanzado',
            'Espera unos segundos para volver a solicitar los recursos.',
            'info',
          );
        }
      };

      fetchData();
    }
  }, [crypto, displayToast]);

  if (!crypto) {
    return <CryptoNotFound nameCrypto={cryptoId as string} />;
  }

  const chartDataCrypto = chartData(priceData);
  const chartOptionsCrypto = chartOptions(crypto);

  return (
    <Flex direction="column">
      <Text
        textAlign={'center'}
        textTransform={'uppercase'}
        fontSize="2xl"
        fontWeight="bold"
        mb={4}
      >
        {crypto.CoinInfo.Name}
      </Text>
      <Box width="100%" height={{ base: '320px', md: '400px' }}>
        <Line data={chartDataCrypto} options={chartOptionsCrypto} />
      </Box>
      <Box mt={6}>
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          Transacciones
        </Text>
      </Box>
      <Flex mt={4} justify="space-between">
        <Button
          rounded={'full'}
          size={'md'}
          fontWeight={'normal'}
          px={2}
          color={'#FFF'}
          bg={'#1E59EA'}
          _hover={{ bg: '#007bff', cursor: 'pointer' }}
          w={'100%'}
          mx={2}
        >
          Comprar
        </Button>
        <Button
          rounded={'full'}
          size={'md'}
          fontWeight={'normal'}
          px={2}
          mx={2}
          color={'#FFF'}
          bg={'#80130c'}
          _hover={{ bg: '#d42c19', cursor: 'pointer' }}
          w={'100%'}
        >
          Vender
        </Button>
      </Flex>
    </Flex>
  );
};
