import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increase: () => set((state:any) => ({ count: state.count + 1 })),
  decrease: () => set((state:any) => ({ count: state.count - 1 })),
}));

export { useStore };