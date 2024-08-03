import { useEffect } from 'react';
import { Box, Text, Image, Flex } from '@chakra-ui/react';
import blockWave from '../../assets/block-wave.svg';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useTranslation } from 'react-i18next';

export const Splash = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(ROUTES.LANDING);
    }, 2500);

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
      <Text fontSize="md">{t('splashscreen.title')}</Text>
    </Flex>
  );
};
