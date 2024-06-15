import { IconType } from 'react-icons';
import { ReactNode } from 'react';
import { BoxProps, FlexProps } from '@chakra-ui/react';

export interface LinkItemProps {
  name: string;
  icon: IconType;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
}

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}
