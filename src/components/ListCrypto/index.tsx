import { Flex, Image, Box, Text, Switch, useColorModeValue } from '@chakra-ui/react';
import { ListCryptoProps } from '../../interfaces';
import { useSwitchStore } from '../../stores/switch';
import { formatCurrency } from '../../utils';
import { SupportedCurrency } from '../../constants';
import { useStoreCrypto } from '../../stores/cryptocurrencies';

export const ListCrypto = ({
  cryptocurrency,
  showSwitches = false,
  onClick,
  isCursorPointer = false,
  showPriceCoins = false,
  coin,
  priceCoin,
  symbol,
}: ListCryptoProps) => {
  const { switchStates, toggleSwitch } = useSwitchStore();
  const { currency } = useStoreCrypto();
  const BG_COLOR = useColorModeValue('gray.200', '#171717');
  return (
    <Flex
      key={cryptocurrency.CoinInfo.Id}
      alignItems={'center'}
      cursor={isCursorPointer ? 'pointer' : 'default'}
      justifyContent={'space-between'}
      mb={2}
      _hover={{ bg: !showSwitches ? BG_COLOR : 'inherit' }}
      onClick={onClick}
    >
      <Flex alignItems={'center'}>
        <Image
          boxSize="40px"
          borderRadius="full"
          mr={4}
          src={`https://www.cryptocompare.com${cryptocurrency.CoinInfo.ImageUrl}`}
          alt={cryptocurrency.CoinInfo.FullName}
        />
        <Box>
          <Text fontSize={'medium'} textTransform={'uppercase'}>
            {cryptocurrency.CoinInfo.Name}
          </Text>
          <Text color={'gray.500'} fontSize={'small'}>
            {cryptocurrency.CoinInfo.FullName}
          </Text>
        </Box>
      </Flex>
      {showSwitches && (
        <Box>
          <Switch
            isChecked={switchStates[cryptocurrency.CoinInfo.Name] || false}
            onChange={() => toggleSwitch(cryptocurrency.CoinInfo.Name)}
            sx={{
              '.chakra-switch__track': {
                backgroundColor: switchStates[cryptocurrency.CoinInfo.Name] ? 'green' : '#A0AEC0',
              },
              '.chakra-switch__thumb': {
                backgroundColor: '#FFF',
              },
            }}
            size="lg"
          />
        </Box>
      )}
      {showPriceCoins && (
        <Box textAlign="right">
          <Text fontSize="lg" fontWeight="bold">
            {coin}
          </Text>
          <Text fontSize={'sm'} color="gray.500">
            {`${symbol ?? ''} ${formatCurrency(priceCoin as number, currency as SupportedCurrency)}`}
          </Text>
        </Box>
      )}
    </Flex>
  );
};
