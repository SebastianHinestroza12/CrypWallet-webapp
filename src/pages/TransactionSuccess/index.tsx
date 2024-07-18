import { useEffect, useState } from 'react';
import { Box, Button, Flex, Text, useColorModeValue, Icon, Stack } from '@chakra-ui/react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants';
import Confetti from 'react-confetti';

export const TransactionSuccess = () => {
  const navigate = useNavigate();
  const BG_COLOR = useColorModeValue('#FFF', '#171717');
  const { state } = useLocation();

  console.log(state);
  useEffect(() => {
    const handleResize = () => {
      setConfettiDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [confettiDimension, setConfettiDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  return (
    <Box
      p={5}
      boxShadow="md"
      borderRadius="md"
      bg={BG_COLOR}
      maxWidth="600px"
      mx="auto"
      textAlign="center"
    >
      <Confetti width={confettiDimension.width} height={confettiDimension.height} recycle={false} />
      <Flex justifyContent="center" alignItems="center" mb={5}>
        <Icon as={FaRegCheckCircle} w={10} h={10} color="green.500" />
        <Text ml={2} fontWeight="bold" fontSize="2xl" textAlign="center">
          Transaction Successful!
        </Text>
      </Flex>
      <Text fontSize="lg" mb={5}>
        Your transaction was completed successfully.
      </Text>
      <Stack spacing={4} direction={{ base: 'column', md: 'row' }} justify="center">
        <Button
          bg={'#1e59ea'}
          color={'white'}
          w={{ base: 'full', md: 'sm' }}
          _hover={{ bg: 'blue.500' }}
          onClick={() => navigate(ROUTES.TRANSACTION_DETAILS, { state: { data: state } })}
        >
          View Transaction Details
        </Button>
        <Button
          bg={'gray.500'}
          color={'white'}
          w={{ base: 'full', md: 'sm' }}
          _hover={{ bg: 'gray.600' }}
          onClick={() => navigate(ROUTES.HOME)}
        >
          Return to Home
        </Button>
      </Stack>
    </Box>
  );
};
