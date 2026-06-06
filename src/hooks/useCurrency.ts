import { useSettingsStore } from '@/stores/settingsStore';

export function useCurrency() {
  const currency = useSettingsStore((state) => state.currency);
  const setCurrency = useSettingsStore((state) => state.setCurrency);

  const formatCurrency = (amount: number | string) => {
    if (amount === undefined || amount === null) return '';
    
    // Parse the number, removing any existing currency symbols or commas
    const numStr = typeof amount === 'string' ? amount.replace(/[^0-9.-]+/g, "") : amount;
    const num = Number(numStr);
    
    if (isNaN(num)) return amount.toString();

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    
    const formattedNum = formatter.format(num);
    return currency === 'BDT' ? `৳${formattedNum}` : `$${formattedNum}`;
  };

  return { currency, setCurrency, formatCurrency };
}
