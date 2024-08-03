import { Box, Text, Center, Icon } from '@chakra-ui/react';
import { MdOutlineSearchOff } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

export const EmptySearch = () => {
  const { t } = useTranslation();
  return (
    <Center flexDirection="column" p={4}>
      <Box p={6} textAlign="center">
        <Icon as={MdOutlineSearchOff} boxSize="60px" mb={4} />
        <Text fontSize="lg">{t('empty_search.title')}</Text>
        <Text fontSize="sm" mt={2}>
          {t('empty_search.description')}
        </Text>
      </Box>
    </Center>
  );
};
