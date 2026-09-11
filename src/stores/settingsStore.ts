import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Currency = 'BDT';

interface SettingsState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      currency: 'BDT',
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'gopos-settings',
    }
  )
);

