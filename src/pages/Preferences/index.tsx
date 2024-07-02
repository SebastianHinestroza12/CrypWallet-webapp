import { Stack, Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { PreferenceList } from '../../components/PreferenceList';
import { useStoreCrypto } from '../../stores/cryptocurrencies';
import { useNavigate } from 'react-router-dom';

export const Preferences = () => {
  const navigation = useNavigate();
  const { currency } = useStoreCrypto();
  const BG_COLOR = useColorModeValue('gray.100', '#171717');
  return (
    <Stack spacing={4}>
      <Heading textAlign={'center'}>Preferencias</Heading>
      <Box p={2} _hover={{ bg: BG_COLOR }} onClick={() => navigation('/preferences/currency')}>
        <PreferenceList title="Currency" subTitle={currency} />
      </Box>
      <Box p={2} _hover={{ bg: BG_COLOR }}>
        <PreferenceList title="App Language" subTitle="English" />
      </Box>
    </Stack>
  );
};
