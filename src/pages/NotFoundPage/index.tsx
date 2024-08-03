import { Heading, Text, Button, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Box
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
        {t('404.title')}
      </Text>
      <Text fontSize="20px" color={'gray.500'} mb={6}>
        {t('404.description')}
      </Text>

      <Link to={ROUTES.HOME}>
        <Button
          p={6}
          fontSize={18}
          rounded={'full'}
          colorScheme="blue"
          bgGradient="linear(to-r, #1e59ea, #66ccff)"
          color="white"
          variant="solid"
        >
          {t('404.button')}
        </Button>
      </Link>
    </Box>
  );
};
