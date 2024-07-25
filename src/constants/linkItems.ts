import { FiHome, FiSettings, FiUserPlus, FiUnlock } from 'react-icons/fi';
import {
  IoWalletOutline,
  IoHomeOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from 'react-icons/io5';
import { MdOutlineDarkMode, MdManageHistory } from 'react-icons/md';
import { FaShieldAlt } from 'react-icons/fa';
import { RiSafe2Fill } from 'react-icons/ri';
import { BsDownload } from 'react-icons/bs';
import { CgLogOut } from 'react-icons/cg';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { LinkItemProps, TabsBottomProps } from '../interfaces';

import { ROUTES } from './redirectToRoute';

export const LINK_ITEMS: LinkItemProps[] = [
  { id: 1, name: 'Home', route: ROUTES.HOME, icon: FiHome },
  { id: 2, name: 'Wallets', route: ROUTES.WALLETS, icon: IoWalletOutline },
  { id: 3, name: 'Dark Mode', icon: MdOutlineDarkMode, showDivider: true },
  { id: 5, name: 'Preferences', route: ROUTES.PREFERENCES_LIST, icon: FiSettings },
  { id: 6, name: 'Manage crypto', route: ROUTES.CRYPTO_MANAGE, icon: MdManageHistory },
  { id: 16, name: 'Search', route: ROUTES.CRYPTO_SEARCH, icon: AiOutlineFileSearch },
  { id: 7, name: 'Security', route: ROUTES.SECURUTY_LIST, icon: RiSafe2Fill, showDivider: true },
  { id: 9, name: 'Register', route: ROUTES.USER_SIGNUP, icon: FiUserPlus },
  { id: 10, name: 'Log Out', route: ROUTES.HOME, icon: CgLogOut },
  {
    id: 11,
    name: 'Recover account',
    route: ROUTES.RECOVER_ACCOUNT,
    icon: FiUnlock,
    showDivider: true,
  },
  { id: 12, name: 'About', route: ROUTES.ABOUT_US, icon: FaShieldAlt },
  { id: 13, name: 'Install App', icon: BsDownload },
];

export const TABS_BOTTOM: TabsBottomProps[] = [
  { icon: IoHomeOutline, label: 'Home', path: ROUTES.HOME },
  { icon: AiOutlineFileSearch, label: 'Search', path: ROUTES.CRYPTO_SEARCH },
  { icon: IoSettingsOutline, label: 'Preferences', path: ROUTES.PREFERENCES_LIST },
  { icon: IoPersonOutline, label: 'Profile', path: ROUTES.USER_PROFILE },
];
