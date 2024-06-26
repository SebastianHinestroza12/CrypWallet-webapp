import { useState } from 'react';
import { Box, CloseButton, Flex, useColorModeValue, Switch, useColorMode } from '@chakra-ui/react';
import { Logo } from '../Logo';
import { NavItem } from '../NavItem';
import { SidebarProps } from '../../interfaces';
import { LINK_ITEMS } from '../../constants';
import './scrollbar.css';

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
      {LINK_ITEMS.map((link) => (
        <NavItem key={link.id} icon={link.icon} route={link.route} showDivider={link.showDivider}>
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
                  onChange={handletoggleColorMode}
                />
              </Box>
            )}
          </Box>
        </NavItem>
      ))}
    </Box>
  );
};
