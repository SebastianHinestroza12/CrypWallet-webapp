import { Heading, Text, Button, Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useStoreTab } from '../../stores/currentMobileTab';

export const NotFoundPage = () => {
  const { setSelectedTab } = useStoreTab();
  return (
    <Container
      textAlign="center"
      minHeight="100vh"
      py={10}
      px={6}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Heading
        display="inline-block"
        as="h2"
        size="4xl"
        bgGradient="linear(to-r, #1e59ea, #66ccff)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="25px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text fontSize="20px" color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Link to="/home" onClick={() => setSelectedTab('/home')}>
        <Button
          p={6}
          fontSize={18}
          rounded={'full'}
          colorScheme="blue"
          bgGradient="linear(to-r, #1e59ea, #66ccff)"
          color="white"
          variant="solid"
        >
          Go to Home
        </Button>
      </Link>
    </Container>
  );
};
