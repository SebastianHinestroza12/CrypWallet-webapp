import { useState, useMemo, useEffect } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Switch,
  useColorMode,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { NavItem } from '../NavItem';
import { SidebarProps, LinkItemProps } from '../../interfaces';
import { MdOutlineInstallMobile, MdOutlineInstallDesktop } from 'react-icons/md';
import { LINK_ITEMS } from '../../constants';
import { Icon } from '@iconify/react';
import { useStoreAutheticated } from '../../stores/authentication';
import { useToastNotification } from '../../hooks/useToastNotification';
import './scrollbar.css';
import { FooterSection } from '../FooterSection';

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [isReadyForInstall, setIsReadyForInstall] = useState(false);
  const { isAuthenticated, logoutUser } = useStoreAutheticated();
  const { toggleColorMode, colorMode } = useColorMode();
  const [isChecked, setIsChecked] = useState(colorMode === 'dark');
  const selectedIcon = useBreakpointValue({
    base: MdOutlineInstallMobile,
    md: MdOutlineInstallDesktop,
  });
  const showSearchMenu = useBreakpointValue({
    base: false,
    md: true,
  });
  const { displayToast } = useToastNotification();

  console.log(isReadyForInstall);
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log('👍', 'beforeinstallprompt', event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Set state
      setIsReadyForInstall(true);
    });
  }, []);

  const handleToggleColorMode = () => {
    setIsChecked((prev) => !prev);
    toggleColorMode();
  };

  const filterItems = useMemo(() => {
    return LINK_ITEMS.filter((item) => {
      if (isAuthenticated) {
        return item.id !== 8 && item.id !== 9 && (showSearchMenu || item.id !== 16);
      } else {
        return item.id !== 10 && (showSearchMenu || item.id !== 16);
      }
    });
  }, [isAuthenticated, showSearchMenu]);

  const downloadApp = async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      displayToast(
        'No installation prompt',
        'Your browser does not support the installation prompt.',
        'error',
      );
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    //result
    await promptEvent.userChoice;
    // Reset the deferred prompt variable, since
    window.deferredPrompt = null;
  };

  const handleOnClose = async (item: LinkItemProps) => {
    if (item.id === 10) {
      logoutUser();
      onClose();
    } else if (item.id === 13) {
      downloadApp();
    } else {
      onClose();
    }
  };

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', '#101010')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.100', '#171717')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      className="scrollbar-custom"
      overflow={'auto'}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="6" mt="2" justifyContent="space-between">
        <Flex justifyContent={'center'} alignItems={'center'}>
          <Icon icon={'mingcute:safe-shield-2-fill'} width={37} color="#1e59ea" />
          <Text
            ml={2}
            textAlign={'center'}
            fontWeight={'bold'}
            fontSize={'lg'}
            textTransform={'uppercase'}
          >
            cryp wallet
          </Text>
        </Flex>
        <Box>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Box>
      </Flex>
      {filterItems.map((link) => (
        <Box onClick={() => handleOnClose(link)} key={link.id}>
          <NavItem
            icon={link.id === 13 ? selectedIcon! : link.icon}
            route={link.route}
            showDivider={link.showDivider}
          >
            <Box flex={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              {link.name}
              {link.id === 3 && (
                <Box>
                  <Switch
                    sx={{
                      '.chakra-switch__track': {
                        backgroundColor: isChecked ? 'green' : '#A0AEC0',
                      },
                      '.chakra-switch__thumb': {
                        backgroundColor: '#FFF',
                      },
                    }}
                    isChecked={isChecked}
                    size="lg"
                    onChange={handleToggleColorMode}
                  />
                </Box>
              )}
            </Box>
          </NavItem>
        </Box>
      ))}
      <FooterSection />
    </Box>
  );
};
