/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  chartData,
  chartOptions,
  fetchPriceData,
  formatChange,
  formatCurrency,
  fetchDescription,
  translateText,
} from '../../../utils';
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
import { PriceDataProps } from '../../../interfaces';
import { useToastNotification } from '../../../hooks/useToastNotification';
import {
  Flex,
  Stack,
  Image,
  Text,
  Box,
  Collapse,
  Button,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreCrypto } from '../../../stores/cryptocurrencies';
import { SupportedCurrency } from '../../../constants';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const CryptoOverview = () => {
  const {
    state: { infoCrypto },
  } = useLocation();
  const { currency } = useStoreCrypto();
  const [priceData, setPriceData] = useState<PriceDataProps[]>([]);
  const [description, setDescription] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { displayToast } = useToastNotification();
  const price = (infoCrypto.RAW?.[currency]?.PRICE ?? 0).toFixed(2);
  const symbol = infoCrypto.DISPLAY?.[currency]?.TOSYMBOL;
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (infoCrypto) {
      const fetchData = async () => {
        try {
          const data = await fetchPriceData(infoCrypto);
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
  }, []);

  useEffect(() => {
    if (infoCrypto) {
      const fetchDescriptionCrypto = async () => {
        try {
          const description = await fetchDescription(infoCrypto.CoinInfo.Name);
          if (i18n.language !== 'en') {
            const traslateDescription = await translateText(description, i18n.language);
            setDescription(
              traslateDescription?.status ? traslateDescription.textTraslate : description,
            );

            return;
          }
          setDescription(description);
        } catch (error) {
          displayToast(
            'Error al obtener descripción',
            'No se pudo obtener la descripción de la criptomoneda.',
            'error',
          );
        }
      };

      fetchDescriptionCrypto();
    }
  }, []);

  const handleToggle = () => setIsExpanded((prev) => !prev);

  const isPositive = infoCrypto?.RAW?.[currency]?.CHANGEPCT24HOUR > 0;
  const chartDataCrypto = chartData(priceData, isPositive, currency);
  const chartOptionsCrypto = chartOptions(infoCrypto);
  const BG = useColorModeValue('gray.200', '#171717');
  const TEXT_COLOR = useColorModeValue('gray.700', 'gray.300');

  return (
    <Stack spacing={4} pb={4}>
      <Box>
        <Flex justifyContent={'space-between'}>
          <Flex>
            <Image
              src={`https://www.cryptocompare.com${infoCrypto.CoinInfo.ImageUrl}`}
              alt={infoCrypto.CoinInfo.Name}
              boxSize={{ base: '35px', md: '50px' }}
              borderRadius="full"
            />
            <Text
              ml={2}
              fontWeight="bold"
              fontSize="2xl"
              textAlign="center"
              textTransform="capitalize"
            >
              {infoCrypto.CoinInfo.FullName}
            </Text>
          </Flex>
          <Box>
            <IconButton
              icon={<Icon icon="mdi:arrow-left" width="24" height="24" />}
              variant="outline"
              aria-label="Go back"
              onClick={() => navigate(-1)}
            />
          </Box>
        </Flex>
        <Flex pl={2} mt={2}>
          <Text color="gray.500">
            {`${symbol} ${formatCurrency(price, currency as SupportedCurrency)}`}
          </Text>
          <Text
            ml={3}
            color={infoCrypto.RAW?.[currency]?.CHANGEPCT24HOUR >= 0 ? '#17ca56' : '#cf0c07'}
          >
            {formatChange(infoCrypto.RAW?.[currency]?.CHANGEPCT24HOUR)}
          </Text>
        </Flex>
      </Box>
      <Box width="100%" height={{ base: '320px', md: '400px' }}>
        <Line data={chartDataCrypto} options={chartOptionsCrypto} />
      </Box>
      {description !== '' && (
        <Box mt={6}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            {`About ${infoCrypto.CoinInfo.Name}`}
          </Text>
          <Collapse in={isExpanded} animateOpacity>
            <Text color={TEXT_COLOR}>{description}</Text>
          </Collapse>
          {!isExpanded && (
            <Text mt={2} color={TEXT_COLOR}>
              {description.substring(0, 100)}...
            </Text>
          )}
          <Button mt={2} variant="link" color="#1e59ea" onClick={handleToggle} display="block">
            {isExpanded ? 'Read less' : 'Read more'}
          </Button>
        </Box>
      )}
      <Box mt={3}>
        <Text mb={3} fontSize="lg" fontWeight="bold">
          Stats
        </Text>
        <Stack bg={BG} p={2} borderRadius="md">
          {[
            {
              label: 'market cap',
              value: infoCrypto.RAW?.[currency]?.CIRCULATINGSUPPLYMKTCAP,
              symbol,
            },
            {
              label: 'circulating supply',
              value: infoCrypto.RAW?.[currency]?.CIRCULATINGSUPPLY,
              suffix: infoCrypto.CoinInfo.Name,
            },
            {
              label: 'total supply',
              value: infoCrypto.RAW?.[currency]?.SUPPLY,
              suffix: infoCrypto.CoinInfo.Name,
            },
            { label: 'volume (24h)', symbol, value: infoCrypto.RAW?.[currency]?.VOLUME24HOUR },
          ].map(({ label, value, suffix, symbol }) => (
            <Flex key={label} justifyContent="space-between" alignItems="center">
              <Text color={TEXT_COLOR} textTransform="capitalize">
                {label}
              </Text>
              <Text fontSize="smaller">
                {symbol ?? ''} {formatCurrency(value, currency as SupportedCurrency)} {suffix || ''}
              </Text>
            </Flex>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
