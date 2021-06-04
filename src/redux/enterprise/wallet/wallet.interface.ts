import {
  TransactionType,
  TransactionStatus,
  Transaction,
} from '../../../models/transaction';
import { Currency } from '../../../models/balance';

export interface EnterpriseTransactionState {
  isFetching: boolean;
  type: TransactionType | null;
  status: TransactionStatus | null;
  currency: Currency | null;
  data: Transaction[];
}

export interface EnterpriseWalletState {
  transaction: EnterpriseTransactionState;
}
