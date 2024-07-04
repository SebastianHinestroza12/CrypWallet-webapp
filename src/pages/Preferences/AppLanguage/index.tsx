import { Stack, Text, Box, Heading, useColorModeValue, Flex } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { LANGUAGES } from '../../../constants';

export const AppLanguage = () => {
  const BG_COLOR = useColorModeValue('gray.100', '#171717');
  return (
    <Stack direction={'column'} spacing={3}>
      <Heading textAlign={'center'} mb={4}>
        Select Language
      </Heading>
      {LANGUAGES.map((language) => (
        <Flex
          key={language.code}
          p={3}
          borderWidth={1}
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
  );
};
