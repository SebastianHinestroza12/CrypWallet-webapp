import { useEffect } from 'react';
import { Box, Text, Image, Flex } from '@chakra-ui/react';
import blockWave from '../../assets/block-wave.svg';
import { useNavigate } from 'react-router-dom';

export const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/landing');
    }, 2700);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Flex direction="column" justify="center" align="center" height="100vh">
      <Box mb={4}>
        <Image src={blockWave} alt="Loading..." boxSize="80px" />
      </Box>
      <Text fontSize="2xl" fontWeight="bold">
        Cryp Wallet
      </Text>
      <Text fontSize="md">Your secure multi-coin wallet</Text>
    </Flex>
  );
};
