import { IconType } from 'react-icons';
import { ReactNode } from 'react';
import { BoxProps, FlexProps } from '@chakra-ui/react';

export interface LinkItemProps {
  id: number;
  name: string;
  icon: IconType;
  showDivider?: boolean;
  route?: string;
}
export interface TabsBottomProps {
  label: string;
  icon: IconType;
  path: string;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  showDivider?: boolean;
  route?: string;
}

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export interface SidebarWithHeaderProps {
  children?: ReactNode;
}
