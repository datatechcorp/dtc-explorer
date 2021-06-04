import { Category, CategoryTreeNode } from '../models/category';
import { Currency } from '../models/balance';
import { PaymentMethod } from '../models/order';

export const toUpperCaseFirstLetter = (text: string): string => {
  if (!text || text.length == 0) {
    return text;
  }

  return text.slice(0, 1).toUpperCase() + text.slice(1);
};

export const formatQuery = (query: object): string => {
  if (!query) {
    return '';
  }
  let stringQuery = '?';
  for (const key in query) {
    if (typeof query[key] !== 'undefined') {
      stringQuery += `${key}=${query[key]}&`;
    }
  }
  return stringQuery;
};

const convertTimeToString = (time: Date, format: string): string => {
  const date = new Date(time);
  const year = date.getFullYear().toString();
  const mon = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hour = ('0' + date.getHours()).slice(-2);
  const min = ('0' + date.getMinutes()).slice(-2);
  const second = ('0' + date.getSeconds()).slice(-2);

  return format
    .replace('YYYY', year)
    .replace('yyyy', year)
    .replace('dd', day)
    .replace('DD', day)
    .replace('MM', mon)
    .replace('hh', hour)
    .replace('mm', min)
    .replace('ss', second);
};

export const formatSeparator = (
  num: number,
  fixed = 5,
  options?: { keepZero: boolean },
): string => {
  try {
    const result = num.toFixed(fixed);
    if (fixed > 1) {
      const part = result.split('.');
      const prefix = part[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      let postfix;
      if (options && options.keepZero) {
        postfix = part[1];
      } else {
        postfix = part[1].replace(/0+$/g, '');
      }
      return `${prefix}${postfix !== '' ? '.' : ''}${postfix}`;
    }
    return result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  } catch (err) {
    return '';
  }
};

const buildCategoryTree = (categories: Category[]): CategoryTreeNode[] => {
  const roots: CategoryTreeNode[] = categories
    .filter((item) => !item.parent_id)
    .map((item) => ({
      ...item,
      label: item.title,
      value: item._id,
      children: [],
    }));
  const nodeStack: CategoryTreeNode[] = [...roots];

  while (nodeStack.length > 0) {
    const current = nodeStack.pop();
    if (!current) {
      break;
    }
    const children: CategoryTreeNode[] = categories
      .filter((item) => item.parent_id === current._id)
      .map((item) => ({
        ...item,
        label: item.title,
        value: item._id,
        children: [],
      }));

    current.children = children;
    nodeStack.push(...children);
  }

  return roots;
};

function getDisplayNameForCurrency(currency: Currency): string {
  if (currency === Currency.APOINT) {
    return 'USDA';
  } else if (currency === Currency.USD) {
    return 'USDT';
  } else {
    return currency;
  }
}

function getDisplayNameForWallet(wallet: any): string {
  return wallet;
}

function detectWebcam(callback: (hasWebcam: boolean) => any): void {
  const md = navigator.mediaDevices;
  if (!md || !md.enumerateDevices) return callback(false);
  md.enumerateDevices().then((devices) => {
    callback(devices.some((device) => 'videoinput' === device.kind));
  });
}
function handleNumberInput(value: string): any {
  let numberHandled = 0;
  if (value) {
    value = value.replace(/\./gi, '');
    numberHandled = parseInt(value);
  }
  if (numberHandled < 0) {
    return null;
  }

  return numberHandled;
}

const formatSeparatorWithKeepZero = (num: number, fixed): string =>
  formatSeparator(num, fixed, { keepZero: true });

function getDisplayNameForPaymentMethod(paymentMethod: PaymentMethod): string {
  if (paymentMethod === PaymentMethod.USD) {
    return 'USDT';
  }
  return paymentMethod;
}

export default {
  toUpperCaseFirstLetter,
  formatQuery,
  convertTimeToString,
  formatSeparator,
  buildCategoryTree,
  getDisplayNameForCurrency,
  detectWebcam,
  handleNumberInput,
  formatSeparatorWithKeepZero,
  getDisplayNameForWallet,
  getDisplayNameForPaymentMethod,
};
