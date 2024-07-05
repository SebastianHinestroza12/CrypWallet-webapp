import { create } from 'zustand';
import { StoreStateAuthentication, UserProps, WalletsIProps } from '../interfaces';
import { AuthService } from '../services/authService';

const INITIAL_STATE = {
  id: '',
  name: '',
  lastName: '',
  email: '',
};

export const useStoreAutheticated = create<StoreStateAuthentication>((set) => ({
  isAuthenticated: false,
  authenticatedUser: INITIAL_STATE,
  safeWords: [],
  wallets: [],
  currentWallet: null,

  // Autenticar al usuario
  authenticateUser: (user: UserProps) =>
    set(() => ({
      isAuthenticated: true,
      authenticatedUser: user,
    })),

  // Cerrar sesión del usuario
  logoutUser: async () => {
    set({ isAuthenticated: false, authenticatedUser: INITIAL_STATE, safeWords: [], wallets: [] });
    //Remover el token del usuario
    await AuthService.logout();
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

  setCurrentWallet: (wallet: WalletsIProps, userId: string) => {
    // Actualizarla en el store
    set(() => ({ currentWallet: wallet }));
    // Actualizar la wallet en la db
    AuthService.updateProfile({ currentWallet: wallet.id }, userId);
  },
}));
