/* eslint-disable max-len */
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
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { MobileProps } from '../../interfaces';
import { useStoreAutheticated } from '../../stores/authentication';

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const navigation = useNavigate();
  const bg = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { isAuthenticated } = useStoreAutheticated();

  const handleNavigation = () => {
    navigation('/auth/user-profile');
  };

  return (
    <Flex
      position="sticky"
      top="0"
      zIndex="50"
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', '#101010')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="shot"
        size={'lg'}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      {isAuthenticated ? (
        <HStack spacing={{ base: '0', md: '6' }}>
          <IconButton
            onClick={() => navigation('/notifications')}
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">Justina Clark</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList bg={bg} borderColor={borderColor}>
                <MenuItem onClick={handleNavigation}>Profile</MenuItem>
                <MenuDivider />
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      ) : (
        <Button
          rounded={'full'}
          size={'md'}
          fontWeight={'normal'}
          px={7}
          _hover={{ bg: '#007bff', cursor: 'pointer', color: 'white' }}
        >
          <Text cursor="pointer">Log In</Text>
        </Button>
      )}
    </Flex>
  );
};
