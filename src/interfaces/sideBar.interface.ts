import { IconType } from 'react-icons';
import { ReactNode } from 'react';
import { BoxProps, FlexProps } from '@chakra-ui/react';

export interface LinkItemProps {
  id: number;
  name: string;
  icon: IconType;
  showDivider?: boolean;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  showDivider?: boolean;
}

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}
