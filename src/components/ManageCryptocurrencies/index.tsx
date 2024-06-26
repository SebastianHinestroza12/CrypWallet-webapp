import { ChangeEvent, useEffect, useState } from 'react';
import { Stack, Flex, Box, Image, Text, Switch } from '@chakra-ui/react';
import { ListCryptoManageProps } from '../../interfaces';
import { SearchBar } from '../SearchBar';
import { Layout } from '../Layout';
import { useSwitchStore } from '../../stores/switch';

export const ManageCryptocurrencies = ({ cryptocurrencies }: ListCryptoManageProps) => {
  const [crypto, setCrypto] = useState(cryptocurrencies);
  const { switchStates, toggleSwitch } = useSwitchStore();

  useEffect(() => {
    setCrypto(cryptocurrencies);
  }, [cryptocurrencies]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: textValue } = event.target;
    const lowerCaseTextValue = textValue.toLowerCase();

    if (!lowerCaseTextValue) {
      setCrypto(cryptocurrencies);
      return;
    }

    setCrypto(
      cryptocurrencies.filter(
        (crypto) =>
          crypto.name?.toLowerCase().includes(lowerCaseTextValue) ||
          crypto.symbol?.toLowerCase().includes(lowerCaseTextValue),
      ),
    );
  };

  return (
    <Layout>
      <Stack p={2} spacing={8}>
        <SearchBar handleChange={handleChange} />
        <Box>
          {crypto.map((cryptocurrency) => (
            <Flex
              key={cryptocurrency.id}
              alignItems={'center'}
              justifyContent={'space-between'}
              mb={2}
            >
              <Flex alignItems={'center'}>
                <Image
                  boxSize="30px"
                  borderRadius="full"
                  mr={4}
                  src={cryptocurrency.image}
                  alt={cryptocurrency.name}
                />
                <Box>
                  <Text fontSize={'medium'} textTransform={'uppercase'}>
                    {cryptocurrency.symbol}
                  </Text>
                  <Text color={'gray.500'} fontSize={'small'}>
                    {cryptocurrency.name}
                  </Text>
                </Box>
              </Flex>
              <Box>
                <Switch
                  isChecked={switchStates[cryptocurrency.id!] || false}
                  onChange={() => toggleSwitch(cryptocurrency.id!)}
                  sx={{
                    '.chakra-switch__track': {
                      backgroundColor: switchStates[cryptocurrency.id!] ? 'green' : '#A0AEC0',
                    },
                    '.chakra-switch__thumb': {
                      backgroundColor: '#FFF',
                    },
                  }}
                  size="lg"
                />
              </Box>
            </Flex>
          ))}
        </Box>
      </Stack>
    </Layout>
  );
};
