import { useState } from 'react';
import { Box, CloseButton, Flex, useColorModeValue, Switch, useColorMode } from '@chakra-ui/react';
import { FiHome, FiSettings, FiLogIn, FiUserPlus, FiUnlock } from 'react-icons/fi';
import { IoWalletOutline } from 'react-icons/io5';
import { MdOutlineDarkMode } from 'react-icons/md';
import { FaShieldAlt } from 'react-icons/fa';
import { BsQrCodeScan } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { GiPadlock } from 'react-icons/gi';
import { Logo } from '../Logo';
import { NavItem } from '../NavItem';
import { LinkItemProps, SidebarProps } from '../../interfaces';
// import { FooterSection } from '../FooterSection';
import './scrollbar.css';

const LinkItems: Array<LinkItemProps> = [
  { id: 1, name: 'Home', route: '/home', icon: FiHome },
  { id: 2, name: 'Wallets', icon: IoWalletOutline },
  { id: 3, name: 'Dark Mode', icon: MdOutlineDarkMode, showDivider: true },
  { id: 4, name: 'Scan QR code', icon: BsQrCodeScan },
  { id: 5, name: 'Preferences', icon: FiSettings },
  { id: 6, name: 'Security', icon: GiPadlock },
  { id: 7, name: 'Notifications', icon: IoIosNotificationsOutline, showDivider: true },
  { id: 8, name: 'Login', route: '/auth/user-signin', icon: FiLogIn },
  { id: 9, name: 'Register', route: '/auth/user-signup', icon: FiUserPlus },
  { id: 11, name: 'Recover account', route: '/recover', icon: FiUnlock, showDivider: true },
  { id: 10, name: 'About', icon: FaShieldAlt },
];

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [isChecked, setIsChecked] = useState(colorMode === 'dark');
  const handletoggleColorMode = () => {
    setIsChecked((prev) => !prev);
    toggleColorMode();
  };

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', '#101010')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      className="scrollbar-custom"
      overflow={'auto'}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="6" mt="2" justifyContent="space-between">
        <Box justifyContent={'flex-start'} display={'flex'} alignItems={'flex-start'}>
          <Logo size="35%" styles="d-flex items-start justify-center" />
        </Box>
        <Box>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Box>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.id} icon={link.icon} route={link.route} showDivider={link.showDivider}>
          <Box flex={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            {link.name}
            {link.id === 3 && (
              <Box>
                <Switch
                  sx={{
                    '.chakra-switch__track': {
                      backgroundColor: isChecked ? '#006400' : '#A0AEC0',
                    },
                    '.chakra-switch__thumb': {
                      backgroundColor: '#FFF',
                    },
                  }}
                  isChecked={isChecked}
                  size="lg"
                  onChange={handletoggleColorMode}
                />
              </Box>
            )}
          </Box>
        </NavItem>
      ))}
      {/* <FooterSection /> */}
    </Box>
  );
};
