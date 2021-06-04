import utils from './utils';

let currentCurrency: string;
let currencyRate: any;
function setCurrency(currency: string): void {
  currentCurrency = currency;
}

function getCurrency(): string {
  return currentCurrency;
}

function setCurrencyRates(rateMap: any): void {
  currencyRate = rateMap;
}

function getCurrentRate(): number {
  if (
    currentCurrency &&
    currencyRate &&
    currencyRate[`USD${currentCurrency}`]
  ) {
    return currencyRate[`USD${currentCurrency}`];
  }
  return 1;
}

function formatCurrencyUsdt(
  usdtAmount,
  options: { showCurrency?: boolean } = { showCurrency: true },
): string {
  const targetAmount = usdtAmount;
  const targetCurrency = 'USDT';
  // if (
  //   currentCurrency &&
  //   currencyRate &&
  //   currencyRate[`USD${currentCurrency}`]
  // ) {
  //   const rate = currencyRate[`USD${currentCurrency}`];
  //   targetAmount = usdtAmount * rate;
  //   targetCurrency = currentCurrency;
  // }
  if (options && options.showCurrency) {
    return utils.formatSeparator(targetAmount, 6) + ' ' + targetCurrency;
  }

  return utils.formatSeparator(targetAmount, 6);
}

function formatCurrency(amount, currency?: string): string {
  const targetAmount = amount;

  if (currency) {
    return utils.formatSeparator(targetAmount, 6) + ' ' + currency;
  }

  return utils.formatSeparator(targetAmount, 6);
}

export const currencyFormatter = {
  setCurrency,
  setCurrencyRates,
  formatCurrencyUsdt,
  getCurrentRate,
  formatCurrency,
  getCurrency,
};
