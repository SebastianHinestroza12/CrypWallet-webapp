import { Stack, Flex, Box, Image, Text, Switch } from '@chakra-ui/react';
import { ListCryptoManageProps } from '../../interfaces';
import { SearchBar } from '../SearchBar';
import { Layout } from '../Layout';

export const ManageCryptocurrencies = ({ cryptocurrencies }: ListCryptoManageProps) => {
  const isChecked = true;
  return (
    <Layout>
      <Stack p={2} spacing={8}>
        <SearchBar />
        <Box>
          {cryptocurrencies.map((cryptocurrency) => (
            <Flex key={cryptocurrency.id} justifyContent={'space-between'} mb={2}>
              <Flex>
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
                  sx={{
                    '.chakra-switch__track': {
                      backgroundColor: isChecked ? 'green' : '#A0AEC0',
                    },
                    '.chakra-switch__thumb': {
                      backgroundColor: '#FFF',
                    },
                  }}
                  isChecked={isChecked}
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
