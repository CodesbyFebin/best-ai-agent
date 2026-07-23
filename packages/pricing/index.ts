export interface CurrencyConversion {
  usdToInrRate: number;
}

export const DEFAULT_CURRENCY_CONVERSION: CurrencyConversion = {
  usdToInrRate: 84.0,
};

export function formatINR(amountInUSD: number, rate: number = DEFAULT_CURRENCY_CONVERSION.usdToInrRate): string {
  const inr = Math.round(amountInUSD * rate);
  return `₹${inr.toLocaleString('en-IN')}`;
}

export function parseUSDPrice(usdStr: string): number {
  const match = usdStr.match(/(\d+(\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}
