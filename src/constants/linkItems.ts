import { FiHome, FiSettings, FiUserPlus, FiUnlock } from 'react-icons/fi';
import { IoWalletOutline } from 'react-icons/io5';
import { MdOutlineDarkMode, MdManageHistory } from 'react-icons/md';
import { FaShieldAlt, FaHome, FaSearch, FaUser } from 'react-icons/fa';
import { RiSafe2Fill } from 'react-icons/ri';
import { BsDownload } from 'react-icons/bs';
import { SiHiveBlockchain } from 'react-icons/si';
import { CgLogOut, CgLogIn } from 'react-icons/cg';
import { LinkItemProps, TabsBottomProps } from '../interfaces';

export const LINK_ITEMS: LinkItemProps[] = [
  { id: 1, name: 'Home', route: '/home', icon: FiHome },
  { id: 2, name: 'Wallets', route: '/wallets', icon: IoWalletOutline },
  { id: 3, name: 'Dark Mode', icon: MdOutlineDarkMode, showDivider: true },
  { id: 5, name: 'Preferences', route: '/preferences/list', icon: FiSettings },
  { id: 6, name: 'Manage crypto', route: '/crypto/manage', icon: MdManageHistory },
  { id: 7, name: 'Security', icon: RiSafe2Fill, showDivider: true },
  { id: 8, name: 'Log In', route: '/auth/user-signin', icon: CgLogIn },
  { id: 9, name: 'Register', route: '/auth/user-signup', icon: FiUserPlus },
  { id: 10, name: 'Log Out', route: '/home', icon: CgLogOut },
  {
    id: 11,
    name: 'Recover account',
    route: '/auth/recover-account',
    icon: FiUnlock,
    showDivider: true,
  },
  { id: 12, name: 'About', route: '/about-us', icon: FaShieldAlt },
  { id: 13, name: 'Download App', icon: BsDownload },
];

export const TABS_BOTTOM: TabsBottomProps[] = [
  { icon: FaHome, label: 'Home', path: '/home' },
  { icon: FaSearch, label: 'Search', path: '/crypto/search' },
  { icon: SiHiveBlockchain, label: 'Blockchain', path: '/notifications' },
  { icon: FaUser, label: 'Profile', path: '/auth/user-profile' },
];
