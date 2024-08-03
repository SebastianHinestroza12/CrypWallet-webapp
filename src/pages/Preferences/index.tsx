import { Stack, Box, Heading, useColorModeValue, Flex, IconButton } from '@chakra-ui/react';
import { PreferenceList } from '../../components/PreferenceList';
import { Icon } from '@iconify/react';
import { useStoreCrypto } from '../../stores/cryptocurrencies';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useTranslation } from 'react-i18next';

export const Preferences = () => {
  const navigation = useNavigate();
  const { currency, appLanguage } = useStoreCrypto();
  const BG_COLOR = useColorModeValue('gray.100', '#171717');
  const { t } = useTranslation();

  return (
    <Stack spacing={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading textAlign={'center'} size="md">
          {t('preferences.preference_list.title')}
        </Heading>
        <IconButton
          icon={<Icon icon="mdi:arrow-left" width="24" height="24" />}
          variant="outline"
          aria-label="Go back"
          onClick={() => navigation(-2)}
        />
      </Flex>
      <Box
        p={2}
        _hover={{ bg: BG_COLOR, cursor: 'pointer' }}
        onClick={() => navigation(ROUTES.PREFERENCES_CURRENCY)}
      >
        <PreferenceList
          title={t('preferences.preference_list.title_currency')}
          subTitle={currency}
        />
      </Box>
      <Box
        p={2}
        _hover={{ bg: BG_COLOR, cursor: 'pointer' }}
        onClick={() => navigation(ROUTES.PREFERENCES_LANGUAGE)}
      >
        <PreferenceList
          title={t('preferences.preference_list.title_language')}
          subTitle={appLanguage}
        />
      </Box>
    </Stack>
  );
};
