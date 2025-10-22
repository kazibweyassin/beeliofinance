import React from 'react';

export type Currency = 'UGX' | 'KES' | 'NGN';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  name: string;
  country: string;
  exchangeRate?: number; // Rate to USD for reference
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  UGX: {
    code: 'UGX',
    symbol: 'UGX',
    name: 'Ugandan Shilling',
    country: 'Uganda',
    exchangeRate: 0.00027 // Approximate rate to USD
  },
  KES: {
    code: 'KES',
    symbol: 'KSh',
    name: 'Kenyan Shilling',
    country: 'Kenya',
    exchangeRate: 0.0067 // Approximate rate to USD
  },
  NGN: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    country: 'Nigeria',
    exchangeRate: 0.00066 // Approximate rate to USD
  }
};

export const formatCurrency = (
  amount: number,
  currency: Currency,
  options: {
    showSymbol?: boolean;
    showCode?: boolean;
    decimals?: number;
  } = {}
): string => {
  const { showSymbol = true, showCode = false, decimals = 0 } = options;
  const config = CURRENCIES[currency];
  
  // Format number with appropriate separators
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
  
  if (showSymbol && showCode) {
    return `${config.symbol} ${formattedAmount} ${config.code}`;
  } else if (showSymbol) {
    return `${config.symbol} ${formattedAmount}`;
  } else if (showCode) {
    return `${formattedAmount} ${config.code}`;
  } else {
    return formattedAmount;
  }
};

export const getCurrencyByCountry = (country: string): Currency => {
  switch (country.toLowerCase()) {
    case 'kenya':
      return 'KES';
    case 'uganda':
      return 'UGX';
    case 'nigeria':
      return 'NGN';
    default:
      return 'UGX'; // Default to Uganda
  }
};

export const convertCurrency = (
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number => {
  if (fromCurrency === toCurrency) return amount;
  
  const fromConfig = CURRENCIES[fromCurrency];
  const toConfig = CURRENCIES[toCurrency];
  
  if (!fromConfig.exchangeRate || !toConfig.exchangeRate) {
    return amount; // Return original if no exchange rates available
  }
  
  // Convert to USD first, then to target currency
  const usdAmount = amount * fromConfig.exchangeRate;
  return usdAmount / toConfig.exchangeRate;
};

// Currency selector component
interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  className?: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onCurrencyChange,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value as Currency)}
        className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      >
        {Object.values(CURRENCIES).map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.symbol} - {currency.name} ({currency.country})
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

// Currency display component
interface CurrencyDisplayProps {
  amount: number;
  currency: Currency;
  showSymbol?: boolean;
  showCode?: boolean;
  decimals?: number;
  className?: string;
}

export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  amount,
  currency,
  showSymbol = true,
  showCode = false,
  decimals = 0,
  className = ''
}) => {
  const formattedAmount = formatCurrency(amount, currency, {
    showSymbol,
    showCode,
    decimals
  });
  
  return (
    <span className={className}>
      {formattedAmount}
    </span>
  );
};

export default {
  CURRENCIES,
  formatCurrency,
  getCurrencyByCountry,
  convertCurrency,
  CurrencySelector,
  CurrencyDisplay
};
