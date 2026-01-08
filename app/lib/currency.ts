export const localeToCurrency: Record<string, { code: string; symbol: string }> = {
  'en-US': { code: 'USD', symbol: '$' },
  'en-GB': { code: 'GBP', symbol: '£' },
  'hi': { code: 'INR', symbol: '₹' },
  'id': { code: 'IDR', symbol: 'Rp' },
};

let exchangeRateCache: { [key: string]: { rate: number; timestamp: number } } = {};
const CACHE_DURATION = 60 * 60 * 1000;

export async function getExchangeRate(
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  if (fromCurrency === toCurrency) return 1;

  const cacheKey = `${fromCurrency}_${toCurrency}`;
  const cached = exchangeRateCache[cacheKey];

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.rate;
  }

  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
      { cache: 'no-store' }
    );

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    const rate = data.rates[toCurrency];

    if (!rate) throw new Error(`Rate not found for ${toCurrency}`);

    exchangeRateCache[cacheKey] = { rate, timestamp: Date.now() };
    return rate;
  } catch (error) {
    console.warn(`Failed to fetch exchange rate for ${fromCurrency}/${toCurrency}, using fallback rates`);
    return getFallbackRate(fromCurrency, toCurrency);
  }
}

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

export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  const rate = await getExchangeRate(fromCurrency, toCurrency);
  return amount * rate;
}

export function formatCurrencyByLocale(
  value: number,
  locale: string,
  decimals: number = 2
): string {
  const currencyInfo = localeToCurrency[locale] ?? localeToCurrency['en-US'];

  if (locale === 'hi' || locale === 'en-GB') {
    if (value >= 10000000) return `${currencyInfo.symbol}${(value / 10000000).toFixed(decimals)} Cr`;
    if (value >= 100000) return `${currencyInfo.symbol}${(value / 100000).toFixed(decimals)} L`;
  }

  const formatted = new Intl.NumberFormat(
    locale === 'en-GB' ? 'en-GB' : locale === 'hi' ? 'en-IN' : locale === 'id' ? 'id-ID' : 'en-US',
    {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }
  ).format(value);

  return `${currencyInfo.symbol}${formatted}`;
}

export function formatCurrencyByCode(
  value: number,
  currencyCode: string,
  locale: string = 'en-US',
  decimals: number = 2
): string {
  const currencyInfo = Object.values(localeToCurrency).find(c => c.code === currencyCode) || 
                       localeToCurrency['en-US'];

  if (currencyCode === 'INR') {
    if (value >= 10000000) return `${currencyInfo.symbol}${(value / 10000000).toFixed(decimals)} Cr`;
    if (value >= 100000) return `${currencyInfo.symbol}${(value / 100000).toFixed(decimals)} L`;
  }

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

export function getCurrencyCodeByLocale(locale: string): string {
  return localeToCurrency[locale]?.code ?? 'USD';
}
