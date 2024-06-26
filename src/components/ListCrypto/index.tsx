import { Flex, Image, Box, Text, Switch, useColorModeValue } from '@chakra-ui/react';
import { CryptoData } from '../../interfaces';
import { useSwitchStore } from '../../stores/switch';
import { memo } from 'react';

interface ListCryptoProps {
  cryptocurrency: CryptoData;
  showSwitches: boolean;
  onClick?: () => void;
}

export const ListCrypto = memo(({ cryptocurrency, showSwitches, onClick }: ListCryptoProps) => {
  const { switchStates, toggleSwitch } = useSwitchStore();
  const BG_COLOR = useColorModeValue('gray.100', 'gray.700');
  return (
    <Flex
      key={cryptocurrency.id}
      alignItems={'center'}
      justifyContent={'space-between'}
      mb={2}
      _hover={{ bg: !showSwitches ? BG_COLOR : 'inherit' }}
      onClick={onClick}
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
      {showSwitches && (
        <Box>
          <Switch
            isChecked={switchStates[cryptocurrency.id] || false}
            onChange={() => toggleSwitch(cryptocurrency.id)}
            sx={{
              '.chakra-switch__track': {
                backgroundColor: switchStates[cryptocurrency.id] ? 'green' : '#A0AEC0',
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
});
