import { Flex, Image, Box, Text, Switch, useColorModeValue } from '@chakra-ui/react';
import { CryptoCompareData } from '../../interfaces';
import { useSwitchStore } from '../../stores/switch';

interface ListCryptoProps {
  cryptocurrency: CryptoCompareData;
  showSwitches: boolean;
  onClick?: () => void;
}

export const ListCrypto = ({ cryptocurrency, showSwitches, onClick }: ListCryptoProps) => {
  const { switchStates, toggleSwitch } = useSwitchStore();
  const BG_COLOR = useColorModeValue('gray.100', 'gray.700');
  return (
    <Flex
      key={cryptocurrency.CoinInfo.Id}
      alignItems={'center'}
      justifyContent={'space-between'}
      mb={2}
      _hover={{ bg: !showSwitches ? BG_COLOR : 'inherit' }}
      onClick={onClick}
    >
      <Flex alignItems={'center'}>
        <Image
          boxSize="45px"
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
            isChecked={switchStates[cryptocurrency.CoinInfo.FullName.toLowerCase()] || false}
            onChange={() => toggleSwitch(cryptocurrency.CoinInfo.FullName.toLowerCase())}
            sx={{
              '.chakra-switch__track': {
                backgroundColor: switchStates[cryptocurrency.CoinInfo.FullName.toLowerCase()]
                  ? 'green'
                  : '#A0AEC0',
              },
              '.chakra-switch__thumb': {
                backgroundColor: '#FFF',
              },
            }}
            size="lg"
          />
        </Box>
      )}
    </Flex>
  );
};
