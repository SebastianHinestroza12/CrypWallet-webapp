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
  { id: 1, name: 'Home', route: ROUTES.HOME, icon: IoHomeOutline },
  { id: 2, name: 'Wallets', route: ROUTES.WALLETS, icon: IoWalletOutline },
  { id: 3, name: 'Dark Mode', icon: MdOutlineDarkMode, showDivider: true },
  { id: 5, name: 'Preferences', route: ROUTES.PREFERENCES_LIST, icon: IoSettingsOutline },
  { id: 6, name: 'Manage crypto', route: ROUTES.CRYPTO_MANAGE, icon: MdOutlineManageHistory },
  { id: 16, name: 'Search', route: ROUTES.CRYPTO_SEARCH, icon: AiOutlineFileSearch },
  { id: 7, name: 'Security', route: ROUTES.SECURUTY_LIST, icon: BsSafe2, showDivider: true },
  { id: 9, name: 'Register', route: ROUTES.USER_SIGNUP, icon: FiUserPlus },
  { id: 10, name: 'Log Out', route: ROUTES.HOME, icon: CiLogout },
  {
    id: 11,
    name: 'Recover account',
    route: ROUTES.RECOVER_ACCOUNT,
    icon: TfiUnlock,
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
