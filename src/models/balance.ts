export enum Currency {
  USD = 'USD',
  APOINT = 'APOINT',
  AMAS = 'AMAS',
}

export interface Balance {
  amount: number;
  pendingAmount?: number;
  currency: Currency;
}
