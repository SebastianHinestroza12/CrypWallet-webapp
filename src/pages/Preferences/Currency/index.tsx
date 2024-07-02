import { ChangeEvent, useState } from 'react';
import { Stack, Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import { SearchBar } from '../../../components/SearchBar';
import { CURRENCIES } from '../../../constants';
import { Icon } from '@iconify/react';
import { Currency as CurrencyState } from '../../../interfaces';
import { useStoreCrypto } from '../../../stores/cryptocurrencies';

export const Currency = () => {
  const BG_COLOR = useColorModeValue('gray.100', '#171717');
  const [currencies, setCurrencies] = useState<CurrencyState[]>(CURRENCIES);
  const { currency, setCurrency } = useStoreCrypto();

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
    <Box>
      <Box>
        <Box mb={5} p={2}>
          <SearchBar handleChange={handleChange} />
        </Box>
        <Stack direction={'column'} spacing={4}>
          <Text color={'gray.500'} p={2}>
            Popular
          </Text>

          {currencies.map((currencie) => (
            <Flex
              key={currencie.code}
              justifyContent={'space-between'}
              alignItems={'center'}
              _hover={{ bg: BG_COLOR, cursor: 'pointer' }}
              p={2}
              onClick={() => setCurrency(currencie.code)}
              borderWidth={1}
              borderRadius="md"
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
    </Box>
  );
};
