import { Stack, Text, Box, Heading, useColorModeValue, Flex, IconButton } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { LANGUAGES } from '../../../constants';
import { useNavigate } from 'react-router-dom';

export const AppLanguage = () => {
  const BG_COLOR = useColorModeValue('gray.100', '#171717');
  const BG = useColorModeValue('gray.200', '#151515');
  const navigation = useNavigate();
  return (
    <Box>
      <Stack direction={'column'} spacing={3}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="md">Languages</Heading>
          <IconButton
            icon={<Icon icon="mdi:arrow-left" width="24" height="24" />}
            variant="outline"
            aria-label="Go back"
            onClick={() => navigation(-1)}
          />
        </Flex>
        {LANGUAGES.map((language) => (
          <Flex
            bg={BG}
            key={language.code}
            p={3}
            borderRadius="md"
            _hover={{ bg: BG_COLOR, cursor: 'pointer' }}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box key={language.code} display="flex" alignItems="center">
              <Icon icon={language.icon} width="24" height="24" style={{ marginRight: '9px' }} />
              <Text>{language.name}</Text>
            </Box>
            <Box>
              <Icon icon="weui:done-filled" width={30} color="green" />
            </Box>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};
