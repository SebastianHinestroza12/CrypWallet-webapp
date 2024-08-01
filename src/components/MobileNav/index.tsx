import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
} from '@chakra-ui/react';
import { FiBell, FiChevronDown } from 'react-icons/fi';
import { CgMenuGridO } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { MobileProps } from '../../interfaces';
import { useStoreAutheticated } from '../../stores/authentication';
import { ROUTES } from '../../constants';

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const navigation = useNavigate();
  const bg = useColorModeValue('gray.100', '#171717');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const {
    isAuthenticated,
    logoutUser,
    avatarUrl,
    authenticatedUser: { name, lastName },
  } = useStoreAutheticated();

  return (
    <Flex
      position="sticky"
      top="0"
      zIndex="50"
      ml={{ base: 0, md: 64 }}
      px={{ base: 4, md: 8 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', '#101010')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.300', '#171717')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="ghost"
        size={'lg'}
        aria-label="open menu"
        icon={<CgMenuGridO size={35} />}
      />

      {isAuthenticated ? (
        <HStack spacing={{ base: '2', md: '6' }}>
          <IconButton
            onClick={() => navigation(ROUTES.NOTIFICATIONS)}
            size="lg"
            variant="ghost"
            aria-label="open notification"
            icon={<FiBell />}
          />
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar size={'sm'} src={avatarUrl} />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{`${name} ${lastName}`}</Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList bg={bg} borderColor={borderColor}>
                <MenuItem onClick={() => navigation(ROUTES.USER_PROFILE)}>Profile</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => logoutUser()}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      ) : (
        <Button
          rounded={'full'}
          onClick={() => navigation(ROUTES.USER_SIGNIN)}
          size={'md'}
          fontWeight={'normal'}
          px={7}
          _hover={{ bg: '#0039A0', cursor: 'pointer', color: '#FFF' }}
          _active={{ bg: '#0039A0' }}
        >
          <Text cursor="pointer">Sign In</Text>
        </Button>
      )}
    </Flex>
  );
};
