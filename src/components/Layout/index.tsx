import { FC, useEffect, useState } from 'react';
import { Box, Drawer, DrawerContent, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import { MobileNav } from '../MobileNav';
import { SidebarContent } from '../SideBarContent';
import { SidebarWithHeaderProps } from '../../interfaces';
import { TabBottomMobile } from '../TabBottom';

export const Layout: FC<SidebarWithHeaderProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isBreakpointReady, setIsBreakpointReady] = useState(false);
  const showTabBottomMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    setIsBreakpointReady(true);
  }, [showTabBottomMobile]);

  return (
    <Box
      minH="100vh"
      position="relative"
      pb={{ base: showTabBottomMobile ? '60px' : '0', md: '0' }}
    >
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p={{ base: 2, md: 5 }}>
        {children}
      </Box>
      {isBreakpointReady && showTabBottomMobile && (
        <Box position="fixed" bottom="0" left="0" width="100%">
          <TabBottomMobile />
        </Box>
      )}
    </Box>
  );
};
