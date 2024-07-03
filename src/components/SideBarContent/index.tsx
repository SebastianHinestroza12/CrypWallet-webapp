import { useState } from 'react';
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
import { SidebarProps } from '../../interfaces';
import { LINK_ITEMS } from '../../constants';
import { Icon } from '@iconify/react';
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
      {LINK_ITEMS.map((link) => (
        <Box onClick={onClose} key={link.id}>
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
                    onChange={handletoggleColorMode}
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
