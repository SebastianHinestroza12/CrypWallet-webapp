import { useState, useMemo } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Switch,
  useColorMode,
  Text,
} from '@chakra-ui/react';
import { NavItem } from '../NavItem';
import { SidebarProps, LinkItemProps } from '../../interfaces';
import { LINK_ITEMS } from '../../constants';
import { Icon } from '@iconify/react';
import { useStoreAutheticated } from '../../stores/authentication';
import './scrollbar.css';

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { isAuthenticated, logoutUser } = useStoreAutheticated();
  const { toggleColorMode, colorMode } = useColorMode();
  const [isChecked, setIsChecked] = useState(colorMode === 'dark');

  const handleToggleColorMode = () => {
    setIsChecked((prev) => !prev);
    toggleColorMode();
  };

  const filterItems = useMemo(() => {
    return LINK_ITEMS.filter((item) =>
      isAuthenticated ? item.id !== 8 && item.id !== 9 : item.id !== 10,
    );
  }, [isAuthenticated]);

  const handleOnClose = (item: LinkItemProps) => {
    if (item.id === 10) {
      logoutUser();
      onClose();
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
          <Icon icon={'mingcute:safe-shield-2-fill'} width={35} color="#1e59ea" />
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
          <NavItem icon={link.icon} route={link.route} showDivider={link.showDivider}>
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
    </Box>
  );
};
