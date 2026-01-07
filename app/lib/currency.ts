// Map locale codes to ISO 4217 currency codes and symbols
export const localeToCurrency: Record<string, { code: string; symbol: string }> = {
  'en-US': { code: 'USD', symbol: '$' },
  'en-GB': { code: 'GBP', symbol: '£' },
  'hi': { code: 'INR', symbol: '₹' },
  'id': { code: 'IDR', symbol: 'Rp' },
};

// Cache for exchange rates (in-memory with simple TTL)
let exchangeRateCache: { [key: string]: { rate: number; timestamp: number } } = {};
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Fetch real-time exchange rates from a free API
 * Using exchangerate-api.com free tier (limited to 1,500 requests/month)
 * Falls back to manual rates if API fails
 */
export async function getExchangeRate(
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  if (fromCurrency === toCurrency) return 1;

  const cacheKey = `${fromCurrency}_${toCurrency}`;
  const cached = exchangeRateCache[cacheKey];

  // Return cached rate if fresh
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.rate;
  }

  try {
    // Using exchangerate-api.com free tier
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
      { cache: 'no-store' }
    );

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    const rate = data.rates[toCurrency];

    if (!rate) throw new Error(`Rate not found for ${toCurrency}`);

    // Cache the rate
    exchangeRateCache[cacheKey] = { rate, timestamp: Date.now() };
    return rate;
  } catch (error) {
    console.warn(`Failed to fetch exchange rate for ${fromCurrency}/${toCurrency}, using fallback rates`);
    // Fallback rates (approximate, updated manually or from static data)
    return getFallbackRate(fromCurrency, toCurrency);
  }
}

/**
 * Fallback exchange rates (against INR base)
 * These should be updated periodically
 */
function getFallbackRate(fromCurrency: string, toCurrency: string): number {
  const fallbackRates: Record<string, Record<string, number>> = {
    INR: {
      USD: 0.012,
      GBP: 0.0095,
      IDR: 190,
      INR: 1,
    },
    USD: {
      INR: 83,
      GBP: 0.79,
      IDR: 15800,
      USD: 1,
    },
    GBP: {
      INR: 105,
      USD: 1.27,
      IDR: 20000,
      GBP: 1,
    },
    IDR: {
      INR: 0.0053,
      USD: 0.000063,
      GBP: 0.00005,
      IDR: 1,
    },
  };

  return fallbackRates[fromCurrency]?.[toCurrency] ?? 1;
}

/**
 * Convert amount from one currency to another
 */
export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  const rate = await getExchangeRate(fromCurrency, toCurrency);
  return amount * rate;
}

/**
 * Format number as currency based on locale
 */
export function formatCurrencyByLocale(
  value: number,
  locale: string,
  decimals: number = 2
): string {
  const currencyInfo = localeToCurrency[locale] ?? localeToCurrency['en-US'];

  // Format large numbers in Indian style (e.g., 1,00,000)
  if (locale === 'hi' || locale === 'en-GB') {
    if (value >= 10000000) return `${currencyInfo.symbol}${(value / 10000000).toFixed(decimals)} Cr`;
    if (value >= 100000) return `${currencyInfo.symbol}${(value / 100000).toFixed(decimals)} L`;
  }

  // Standard formatting
  const formatted = new Intl.NumberFormat(
    locale === 'en-GB' ? 'en-GB' : locale === 'hi' ? 'en-IN' : locale === 'id' ? 'id-ID' : 'en-US',
    {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }
  ).format(value);

  return `${currencyInfo.symbol}${formatted}`;
}

/**
 * Format number as currency based on currency code (independent of locale)
 */
export function formatCurrencyByCode(
  value: number,
  currencyCode: string,
  locale: string = 'en-US',
  decimals: number = 2
): string {
  const currencyInfo = Object.values(localeToCurrency).find(c => c.code === currencyCode) || 
                       localeToCurrency['en-US'];

  // Format large numbers in Indian style for INR only
  if (currencyCode === 'INR') {
    if (value >= 10000000) return `${currencyInfo.symbol}${(value / 10000000).toFixed(decimals)} Cr`;
    if (value >= 100000) return `${currencyInfo.symbol}${(value / 100000).toFixed(decimals)} L`;
  }

  // Standard formatting - use currency-appropriate locale for number formatting
  // For non-INR currencies, always use international formatting (en-US/en-GB)
  // even if user's language is Hindi or Indonesian
  const numberFormatLocale = currencyCode === 'INR' && locale === 'hi' ? 'en-IN' : 
                             locale === 'en-GB' ? 'en-GB' : 'en-US';
  
  const formatted = new Intl.NumberFormat(
    numberFormatLocale,
    {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }
  ).format(value);

  return `${currencyInfo.symbol}${formatted}`;
}

/**
 * Get currency code for locale
 */
export function getCurrencyCodeByLocale(locale: string): string {
  return localeToCurrency[locale]?.code ?? 'USD';
}
