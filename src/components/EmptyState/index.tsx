import { Flex, Text, VStack } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

export const EmptyState = () => {
  const { t } = useTranslation();
  return (
    <Flex textAlign="center" px={6} flexDirection={'column'} alignItems={'center'}>
      <Icon icon="mdi:alert-circle-outline" width="60" height="60" color="gray.500" />
      <VStack mt={3}>
        <Text fontSize="lg">{t('empty_switches_state.title')}</Text>
        <Text fontSize="md">{t('empty_switches_state.description')}</Text>
      </VStack>
    </Flex>
  );
};
