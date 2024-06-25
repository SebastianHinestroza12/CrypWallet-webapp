import { FiHome, FiSettings, FiLogIn, FiUserPlus, FiUnlock } from 'react-icons/fi';
import { IoWalletOutline } from 'react-icons/io5';
import { MdOutlineDarkMode, MdOutlineManageHistory } from 'react-icons/md';
import { FaShieldAlt } from 'react-icons/fa';
import { BsQrCodeScan } from 'react-icons/bs';
import { GiPadlock } from 'react-icons/gi';
import { LinkItemProps } from '../interfaces';

export const LINK_ITEMS: LinkItemProps[] = [
  { id: 1, name: 'Home', route: '/home', icon: FiHome },
  { id: 2, name: 'Wallets', icon: IoWalletOutline },
  { id: 3, name: 'Dark Mode', icon: MdOutlineDarkMode, showDivider: true },
  { id: 4, name: 'Scan QR code', icon: BsQrCodeScan },
  { id: 5, name: 'Preferences', icon: FiSettings },
  { id: 6, name: 'Manage cryptocurrencies', route: '/crypto/manage', icon: MdOutlineManageHistory },
  { id: 7, name: 'Security', icon: GiPadlock, showDivider: true },
  { id: 8, name: 'Login', route: '/auth/user-signin', icon: FiLogIn },
  { id: 9, name: 'Register', route: '/auth/user-signup', icon: FiUserPlus },
  {
    id: 10,
    name: 'Recover account',
    route: '/auth/recover-account',
    icon: FiUnlock,
    showDivider: true,
  },
  { id: 11, name: 'About', route: '/about-us', icon: FaShieldAlt },
];
