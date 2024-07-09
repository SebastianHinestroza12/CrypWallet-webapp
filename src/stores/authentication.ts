import { create } from 'zustand';
import { StoreStateAuthentication, UserProps, WalletsIProps } from '../interfaces';
import { AuthService } from '../services/auth.service';

const INITIAL_STATE = {
  id: '',
  name: '',
  lastName: '',
  email: '',
};

export const useStoreAutheticated = create<StoreStateAuthentication>((set, get) => ({
  isAuthenticated: false,
  authenticatedUser: INITIAL_STATE,
  safeWords: [],
  wallets: [],
  currentWallet: null,
  recoveryProgress: 25,
  recoveryStep: 1,
  userIdRecoveryAccount: null,

  // Autenticar al usuario
  authenticateUser: (user: UserProps) =>
    set(() => ({
      isAuthenticated: true,
      authenticatedUser: user,
    })),

  // Cerrar sesión del usuario
  logoutUser: async () => {
    // Obtener el estado actual
    const currentState = get();

    // Remover el token del usuario si está autenticado
    if (currentState.isAuthenticated) {
      await AuthService.logout();
    }

    // Actualizar el estado a los valores iniciales
    set({
      isAuthenticated: false,
      authenticatedUser: INITIAL_STATE,
      safeWords: [],
      wallets: [],
      currentWallet: null,
      recoveryProgress: 25,
      recoveryStep: 1,
      userIdRecoveryAccount: null,
    });

    // Recargar la página
    window.location.reload();
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

  setCurrentWallet: (wallet: WalletsIProps, userId: string, updateDb = true) => {
    // Actualizarla en el store
    set(() => ({ currentWallet: wallet }));
    // Actualizar la wallet en la db
    if (updateDb) AuthService.updateProfile({ currentWallet: wallet.id }, userId);
  },

  updateWallet: (walleId: string, name: string) => {
    // Actualizar la wallet en el store
    set((state) => ({
      wallets: state.wallets.map((wallet) =>
        wallet.id === walleId ? { ...wallet, name } : wallet,
      ),
    }));
  },

  deleteWallet: (walletId: string) => {
    // Eliminar la wallet en el store
    set((state) => ({
      wallets: state.wallets.filter((wallet) => wallet.id !== walletId),
    }));
  },

  // Actualizar el componente a mostrar de acuerdo cuando vaya avansando en la recuperacion
  setRecoveryStep: (step: number) => set({ recoveryStep: step }),

  // Actualizar la barra de progreso en la recuperación de cuenta
  setRecoreyProgress: (progress: number) => set({ recoveryProgress: progress }),

  // Almacenar el id del usuario despues de enviarle el codigo OTP
  setUserIdRecoveryAccount: (userId: string) => set({ userIdRecoveryAccount: userId }),
}));
