import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Currency = 'USD' | 'BDT';

interface SettingsState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      currency: 'USD',
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'gopos-settings',
    }
  )
);
