import { Stack, Text, Box, Heading, useColorModeValue, Flex, IconButton } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { LANGUAGES } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useStoreCrypto } from '../../../stores/cryptocurrencies';

const MotionFlex = motion(Flex);

export const AppLanguage = () => {
  const BG_COLOR = useColorModeValue('gray.100', '#171717');
  const { appLanguage, setAppLanguage } = useStoreCrypto();
  const BG = useColorModeValue('gray.200', '#151515');
  const navigation = useNavigate();
  const { i18n, t } = useTranslation();

  const handleChangeLanguage = (language: string) => {
    setAppLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <Box>
      <Stack direction={'column'} spacing={3}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="md">{t('preferences.language_list.title')}</Heading>
          <IconButton
            icon={<Icon icon="mdi:arrow-left" width="24" height="24" />}
            variant="outline"
            aria-label="Go back"
            onClick={() => navigation(-1)}
          />
        </Flex>
        {LANGUAGES.map((language, index) => (
          <MotionFlex
            bg={BG}
            key={language.code}
            p={3}
            borderRadius="md"
            _hover={{ bg: BG_COLOR, cursor: 'pointer' }}
            justifyContent={'space-between'}
            alignItems={'center'}
            onClick={() => handleChangeLanguage(language.code)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
          >
            <Box key={language.code} display="flex" alignItems="center">
              <Icon icon={language.icon} width="24" height="24" style={{ marginRight: '9px' }} />
              <Text>{t(`preferences.language_list.${language.code}`)}</Text>
            </Box>
            <Box>
              {appLanguage === language.code && (
                <Icon icon="weui:done-filled" width={25} color="green" />
              )}
            </Box>
          </MotionFlex>
        ))}
      </Stack>
    </Box>
  );
};
