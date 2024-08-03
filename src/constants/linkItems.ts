import { FiUserPlus } from 'react-icons/fi';
import {
  IoWalletOutline,
  IoHomeOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from 'react-icons/io5';
import { MdOutlineDarkMode, MdOutlineManageHistory } from 'react-icons/md';
import { FaShieldAlt } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
import { BsDownload, BsSafe2 } from 'react-icons/bs';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { TfiUnlock } from 'react-icons/tfi';
import { LinkItemProps, TabsBottomProps } from '../interfaces';

import { ROUTES } from './redirectToRoute';

export const LINK_ITEMS: LinkItemProps[] = [
  { id: 1, name: 'Home', traslateName: 'home', route: ROUTES.HOME, icon: IoHomeOutline },
  { id: 2, name: 'Wallets', traslateName: 'wallets', route: ROUTES.WALLETS, icon: IoWalletOutline },
  {
    id: 3,
    name: 'Dark Mode',
    traslateName: 'dark_mode',
    icon: MdOutlineDarkMode,
    showDivider: true,
  },
  {
    id: 5,
    name: 'Preferences',
    traslateName: 'preferences',
    route: ROUTES.PREFERENCES_LIST,
    icon: IoSettingsOutline,
  },
  {
    id: 6,
    name: 'Manage crypto',
    traslateName: 'manage_crypto',
    route: ROUTES.CRYPTO_MANAGE,
    icon: MdOutlineManageHistory,
  },
  {
    id: 16,
    name: 'Search',
    traslateName: 'search',
    route: ROUTES.CRYPTO_SEARCH,
    icon: AiOutlineFileSearch,
  },
  {
    id: 7,
    name: 'Security',
    traslateName: 'security',
    route: ROUTES.SECURUTY_LIST,
    icon: BsSafe2,
    showDivider: true,
  },
  {
    id: 9,
    name: 'Register',
    traslateName: 'register',
    route: ROUTES.USER_SIGNUP,
    icon: FiUserPlus,
  },
  { id: 10, name: 'Log Out', traslateName: 'log_out', route: ROUTES.HOME, icon: CiLogout },
  {
    id: 11,
    name: 'Recover account',
    traslateName: 'recover_account',
    route: ROUTES.RECOVER_ACCOUNT,
    icon: TfiUnlock,
    showDivider: true,
  },
  { id: 12, name: 'About', traslateName: 'about', route: ROUTES.ABOUT_US, icon: FaShieldAlt },
  { id: 13, name: 'Install App', traslateName: 'install_app', icon: BsDownload },
];

export const TABS_BOTTOM: TabsBottomProps[] = [
  { icon: IoHomeOutline, label: 'home', path: ROUTES.HOME },
  { icon: AiOutlineFileSearch, label: 'search', path: ROUTES.CRYPTO_SEARCH },
  { icon: IoSettingsOutline, label: 'preferences', path: ROUTES.PREFERENCES_LIST },
  { icon: IoPersonOutline, label: 'profile', path: ROUTES.USER_PROFILE },
];
