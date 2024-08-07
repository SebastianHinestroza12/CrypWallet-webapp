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
import { LINK_ITEMS, ROUTES } from '../../constants';
import { Icon } from '@iconify/react';
import { useStoreAutheticated } from '../../stores/authentication';
import { useToastNotification } from '../../hooks/useToastNotification';
import { FooterSection } from '../FooterSection';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './scrollbar.css';

const MotionFlex = motion(Flex);

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
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

  const { t } = useTranslation();
  const { displayToast } = useToastNotification();

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
    });
  }, []);

  useEffect(() => {
    setIsChecked(colorMode === 'dark');
  }, [colorMode]);

  const handleToggleColorMode = () => {
    setIsChecked((prev) => !prev);
    toggleColorMode();
  };

  const filterItems = useMemo(() => {
    return LINK_ITEMS.filter((item) => {
      if (isAuthenticated) {
        return item.id !== 9 && (showSearchMenu || item.id !== 16);
      } else {
        return item.id !== 10 && (showSearchMenu || item.id !== 16);
      }
    });
  }, [isAuthenticated, showSearchMenu]);

  const downloadApp = async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      displayToast(t('download_app.title'), t('download_app.description'), 'error');
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
    } else if (item.id !== 3) {
      onClose();
    }
  };

  return (
    <MotionFlex
      initial={{ width: 0 }}
      animate={{ width: 'auto' }}
      exit={{ width: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Box
        transition="2s ease"
        bg={useColorModeValue('white', '#101010')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.300', '#171717')}
        w={{ base: 'full', md: 64 }}
        pos="fixed"
        h="full"
        className="scrollbar-custom"
        overflow={'auto'}
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="6" mt="2" justifyContent="space-between">
          <Flex justifyContent={'center'} alignItems={'center'}>
            <Icon icon={'mingcute:safe-shield-2-fill'} width={37} color="#1e59ea" />
            <Link to={ROUTES.HOME}>
              <Text
                ml={2}
                textAlign={'center'}
                fontWeight={'bold'}
                fontSize={'lg'}
                textTransform={'uppercase'}
                cursor={'pointer'}
              >
                cryp wallet
              </Text>
            </Link>
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
                <Text textTransform={'capitalize'}>{t(`menu.${link.traslateName}`)}</Text>
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
    </MotionFlex>
  );
};
