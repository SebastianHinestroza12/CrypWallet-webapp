import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { StoreStateAuthentication, UserProps, WalletsIProps } from '../interfaces';
import { AuthService } from '../services/auth.service';

const INITIAL_STATE = {
  id: '',
  name: '',
  lastName: '',
  email: '',
};

export const useStoreAutheticated = create(
  persist<StoreStateAuthentication>(
    (set, get) => ({
      isAuthenticated: false,
      authenticatedUser: INITIAL_STATE,
      safeWords: [],
      wallets: [],
      currentWallet: null,
      recoveryProgress: 25,
      recoveryStep: 1,
      userIdRecoveryAccount: null,
      avatarUrl: '',

      authenticateUser: (user: UserProps) =>
        set({ isAuthenticated: true, authenticatedUser: user }),

      logoutUser: async () => {
        const { isAuthenticated } = get();

        if (isAuthenticated) {
          await AuthService.logout();
        }

        set({
          isAuthenticated: false,
          authenticatedUser: INITIAL_STATE,
          safeWords: [],
          wallets: [],
          currentWallet: null,
          recoveryProgress: 25,
          recoveryStep: 1,
          userIdRecoveryAccount: null,
          avatarUrl: '',
        });

        window.location.reload();
      },

      addWallet: (wallet: WalletsIProps, replaceWallet = false) => {
        set((state) => ({
          wallets: replaceWallet
            ? (wallet as unknown as WalletsIProps[])
            : [...state.wallets, wallet],
        }));
      },

      addSafeWords: (safes: string[]) => set({ safeWords: safes }),

      setCurrentWallet: (wallet: WalletsIProps, userId: string, updateDb = true) => {
        set({ currentWallet: wallet });

        if (updateDb) {
          AuthService.updateProfile({ currentWallet: wallet.id }, userId);
        }
      },

      updateWallet: (walletId: string, name: string) => {
        set((state) => ({
          wallets: state.wallets.map((wallet) =>
            wallet.id === walletId ? { ...wallet, name } : wallet,
          ),
        }));
      },

      deleteWallet: (walletId: string) => {
        set((state) => ({
          wallets: state.wallets.filter((wallet) => wallet.id !== walletId),
        }));
      },

      // Actualizar el componente a mostrar de acuerdo cuando vaya avanzando en la recuperación
      setRecoveryStep: (step: number) => set({ recoveryStep: step }),

      // Actualizar la barra de progreso en la recuperación de cuenta
      setRecoreyProgress: (progress: number) => set({ recoveryProgress: progress }),

      // Almacenar el id del usuario después de enviarle el código OTP
      setUserIdRecoveryAccount: (userId: string) => set({ userIdRecoveryAccount: userId }),

      //Actualizar el avatar del usuario
      setAvatarUrl: (avatarUrl: string, updateDb = false) => {
        set({ avatarUrl });

        if (updateDb) {
          AuthService.updateProfile({ avatarUrl }, get().authenticatedUser.id!);
        }
      },
    }),
    {
      name: 'auth-storage',
    } as PersistOptions<StoreStateAuthentication>,
  ),
);
