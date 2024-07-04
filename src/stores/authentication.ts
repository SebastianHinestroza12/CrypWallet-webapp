import { create } from 'zustand';
import { StoreStateAuthentication, UserProps, WalletsIProps } from '../interfaces';
import { logout } from '../services/authService';

export const useStoreAutheticated = create<StoreStateAuthentication>((set) => ({
  isAuthenticated: false,
  authenticatedUser: null,
  safeWords: [],
  wallets: [],

  // Autenticar al usuario
  authenticateUser: (user: UserProps) =>
    set(() => ({
      isAuthenticated: true,
      authenticatedUser: user,
    })),

  // Cerrar sesión del usuario
  logoutUser: async () => {
    set({ isAuthenticated: false, authenticatedUser: null, safeWords: [], wallets: [] });
    //Remover el token del usuario
    await logout();
  },

  // Añadir una cartera
  addWallet: (wallet: WalletsIProps) =>
    set((state) => ({
      wallets: [...state.wallets, wallet],
    })),

  // Añadir las palabras de seguridad
  addSafeWords: (safes: string[]) =>
    set(() => ({
      safeWords: safes,
    })),
}));
