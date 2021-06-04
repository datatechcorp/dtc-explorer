import { CoinType } from './coin-types';
import { UserInfo } from './user';
import { Currency } from './balance';
import { WithdrawTargetType } from './withdraw-types';
import { CoinNetwork } from '../redux/wallet/wallet.interface';

export interface Transaction {
  _id: string;
  user: string | UserInfo;
  currency: Currency;
  amount: number;
  status: TransactionStatus;
  symbol: string;
  network: CoinNetwork;
  fee?: number;
  tp_hash?: string; // thirst party hash
  type: TransactionType;
  note?: string;
  deposit_coin?: CoinType;
  deposit_amount?: number;
  withdraw_type?: WithdrawTargetType;
  withdraw_amount?: number;
  withdraw_address?: string;
  withdraw_card_holder?: string;
  withdraw_card_expire?: string;
  send_user?: string | UserInfo;
  send_username_or_email?: string;
  receive_user?: string | UserInfo;
  receive_username_or_email?: string;
  createdAt: Date;
  from_user?: string | UserInfo;
  from_username?: string;
  sub_type?: TransactionSubType;
  from_user_level?: number;
  price?: number;
}

export enum TransactionStatus {
  Completed = 'completed',
  Cancelled = 'cancelled',
  Pending = 'pending',
}

export enum TransactionType {
  Deposit = 'deposit',
  Withdraw = 'withdraw',
  Send = 'send',
  Swap = 'swap',
  Receive = 'receive',
  Bonus = 'bonus',
  BuyCoin = 'buy-coin',
  SellCoin = 'sell-coin',
  WithdrawCoin = 'withdraw-coin',
  BuyProduct = 'buy-product',
  Refund = 'refund',
  Profit = 'profit',
  SellProduct = 'sell-product',
  Invest = 'invest',
  Subscription = 'subscription',
  ExternalSend = 'external-send',
  ExternalReceive = 'external-receive',
}

export enum TransactionSubType {
  SwapIn = 'swap-in',
  SwapOut = 'swap-out',
  Direct = 'direct',
  Binary = 'binary',
  BinaryByLevel = 'binary-by-level',
  Subscription = 'subscription',
  Leader = 'leader',
  Service = 'service',
  Global = 'global',
  Invest = 'invest',
  Enterprise = 'enterprise',
  User = 'user',
}
