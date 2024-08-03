import { Flex, Box, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { ROUTES } from '../../constants';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const InviteToLogin = () => {
  const TEXT_COLOR = useColorModeValue('gray.700', 'gray.300');
  const { t } = useTranslation();
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      textAlign={'center'}
      pb={4}
    >
      <Box mb={{ base: 4, md: 6 }}>
        <Icon icon={'mdi:login'} width={60} />
      </Box>
      <Box mb={{ base: 4, md: 6 }}>
        <Text color={TEXT_COLOR} fontSize={'lg'} fontWeight={'medium'}>
          {t('details_crypto.basics_detail.invite_to_login.title')}
        </Text>
        <Text color={TEXT_COLOR} fontSize={'sm'}>
          {t('details_crypto.basics_detail.invite_to_login.description')}
        </Text>
      </Box>
      <Flex>
        <Link to={ROUTES.USER_SIGNIN}>
          <Button
            rounded={'full'}
            fontWeight={'bold'}
            color={'#FFF'}
            bg={'#1E59EA'}
            _hover={{ bg: '#0039A0', cursor: 'pointer' }}
            _active={{ bg: '#0039A0' }}
            size={{ base: 'md', md: 'lg' }}
            mx={2}
          >
            {t('details_crypto.basics_detail.invite_to_login.button_login')}
          </Button>
        </Link>
        <Link to={ROUTES.USER_SIGNUP}>
          <Button
            rounded={'full'}
            fontWeight={'bold'}
            color={'#FFF'}
            mx={2}
            bg={'#28A745'}
            _hover={{ bg: '#218838', cursor: 'pointer' }}
            _active={{ bg: '#218838' }}
            size={{ base: 'md', md: 'lg' }}
          >
            {t('details_crypto.basics_detail.invite_to_login.button_register')}
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
