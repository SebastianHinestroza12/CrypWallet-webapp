import { FC } from 'react';
import { Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { TotalCash } from '../../components/TotalCash';
import { OperationButton } from '../../components/OperationButton';
import { ListCryptocurrencies } from '../../components/ListCryptocurrencies';
import { OPERATION_BUTTONS, ROUTES } from '../../constants';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Home: FC = () => {
  const BG_COLOR = useColorModeValue('gray.100', '#171717');
  const { t } = useTranslation();

  return (
    <Stack spacing={5}>
      <TotalCash />
      <Flex justifyContent="space-between">
        {OPERATION_BUTTONS.map((button) => (
          <OperationButton
            key={button.text}
            icon={button.icon}
            text={t(`home.operations.${button.text}`)}
          />
        ))}
      </Flex>
      <ListCryptocurrencies />
      <Box mb={3} py={2} _hover={{ bg: BG_COLOR }}>
        <Link to={ROUTES.CRYPTO_MANAGE}>
          <Text
            _hover={{ cursor: 'pointer' }}
            color={'#1e59ea'}
            fontSize={'md'}
            textAlign={'center'}
          >
            {t('home.manager_crypto')}
          </Text>
        </Link>
      </Box>
    </Stack>
  );
};
