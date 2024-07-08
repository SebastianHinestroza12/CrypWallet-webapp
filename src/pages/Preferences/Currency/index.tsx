import { ChangeEvent, useState } from 'react';
import { Stack, Box, Text, Flex, useColorModeValue, IconButton } from '@chakra-ui/react';
import { SearchBar } from '../../../components/SearchBar';
import { CURRENCIES } from '../../../constants';
import { Icon } from '@iconify/react';
import { PreferenceListData } from '../../../interfaces';
import { useStoreCrypto } from '../../../stores/cryptocurrencies';
import { useNavigate } from 'react-router-dom';

export const Currency = () => {
  const BG_COLOR_HOVER = useColorModeValue('gray.100', '#171717');
  const BG = useColorModeValue('gray.200', '#151515');
  const [currencies, setCurrencies] = useState<PreferenceListData[]>(CURRENCIES);
  const { currency, setCurrency } = useStoreCrypto();
  const navigation = useNavigate();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: textValue } = event.target;
    const lowerCaseTextValue = textValue.toLowerCase();

    if (!lowerCaseTextValue) {
      setCurrencies(CURRENCIES);
      return;
    }

    setCurrencies(
      CURRENCIES.filter(
        (currency) =>
          currency.code.toLowerCase().includes(lowerCaseTextValue) ||
          currency.name.toLowerCase().includes(lowerCaseTextValue),
      ),
    );
  };

  return (
    <Box my={3}>
      <Box mb={5}>
        <SearchBar handleChange={handleChange} />
      </Box>
      <Stack direction={'column'} spacing={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text size="xs" color={'gray.500'}>
            Popular
          </Text>
          <IconButton
            icon={<Icon icon="mdi:arrow-left" width="24" height="24" />}
            variant="outline"
            aria-label="Go back"
            onClick={() => navigation(-1)}
          />
        </Flex>

        {currencies.map((currencie) => (
          <Flex
            bg={BG}
            key={currencie.code}
            justifyContent={'space-between'}
            alignItems={'center'}
            _hover={{ bg: BG_COLOR_HOVER, cursor: 'pointer' }}
            px={2}
            py={3}
            onClick={() => setCurrency(currencie.code)}
            borderRadius="lg"
          >
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Box mr={2}>
                <Icon icon={currencie.icon} width={30} />
              </Box>
              <Text>
                {currencie.code} - {currencie.name}
              </Text>
            </Box>
            <Box>
              {currencie.code === currency && (
                <Icon icon="weui:done-filled" width={30} color="green" />
              )}
            </Box>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};
