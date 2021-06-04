import {
  TransactionType,
  TransactionStatus,
  Transaction,
} from '../../models/transaction';
import { UserInfo } from '../../models/user';
import { Currency } from '../../models/balance';
import { PaymentCode } from '../../models/payment-code';

export enum CoinNetwork {
  ERC20 = 'ERC20',
  TRC20 = 'TRC20',
  Other = 'OTHER',
}
export interface Coin {
  _id: string;
  name: string;
  symbol: string;
  decimal: number;
  contract_address: string;
  status: CoinStatus;
  abi: string;
  payment_rate: number;
  network: CoinNetwork;
  is_primary?: boolean;
  createdAt: string;
  updatedAt: string;
  allow_deposit?: boolean;
  allow_withdraw?: boolean;
  allow_transfer?: boolean;
  icon?: string;
  price: number;
}

export enum CoinStatus {
  Active = 'active',
  Disabled = 'disabled',
}

export interface Wallet {
  _id: string;
  user: string;
  address: string;
  encrypted_private_key?: string;
  last_amount_in_network: number;
  total_amount: number;
  available_amount: number;
  status: WalletStatus;
  symbol: string;
  coin: string | Coin;
  is_primary?: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum WalletStatus {
  Active = 'active',
  Disabled = 'disabled',
}

export interface TransactionState {
  isFetching: boolean;
  type: TransactionType | null;
  status: TransactionStatus | null;
  currency: Currency | null;
  data: Transaction[];
  statistic: TransactionStatisticItem[];
}

export interface WithdrawState {
  isFetching: boolean;
  wallet: Wallet | null;
  amount: number | undefined;
  amountError: null | string;
  address: string;
  addressError: null | string;
}

export interface TransferState {
  isFetching: boolean;
  amount: number | undefined;
  amountError: string | null;
  username_or_email: string;
  receivedUser: UserInfo | null;
  canTransfer: boolean;
  wallet: Wallet | null;
}

export interface InvestmentItem {
  amount: number;
  _id: string;
  user: string | UserInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvestmentState {
  isFetching: boolean;
  data: InvestmentItem[];
  maxInvestment: InvestmentItem | null;
}

export interface SubscriptionState {
  mySubscriptions: SubscriptionItem[];
  currentSubscription: SubscriptionItem | null;
  isFetching: boolean;
  isGot: boolean;
}

export interface SubscriptionItem {
  _id?: string;
  amount: number;
  user?: string | UserInfo;
  fee?: number;
  scv: number;
  customer_link: number;
  enterprise_link: number;
  status?: SubscriptionStatus;
  createdAt?: Date;
}

export enum SubscriptionStatus {
  Active = 'active',
  Expired = 'expired',
}

export interface TransactionStatisticId {
  type: string;
  sub_type: string;
  currency?: Currency;
}

export interface TransactionStatisticItem {
  _id: TransactionStatisticId;
  amount: number;
}

export enum CoinServiceActionType {
  Sell = 'sell',
  Buy = 'buy',
  withdraw = 'withdraw',
}

export interface CoinService {
  isFetching: boolean;
  actionType: CoinServiceActionType;
  amount: number;
  address: string;
}

export enum LendingStatus {
  Active = 'active',
  Expired = 'expired',
}

export interface LendingItem {
  amount: number;
  total_profit_amount: number;
  remain_profit_amount: number;
  profit_percent: number;
  status: LendingStatus;
  _id: string;
  user: string | UserInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface LendingForm {
  amount_usd: number | undefined;
  wallet: Wallet | null;
  amountError: string | null;
}

export interface LendingState {
  isFetching: boolean;
  form: LendingForm;
  data: LendingItem[];
}

export interface SwapState {
  isFetching: boolean;
  amount: number;
  amountError: null | string;
}

export interface PaymentCodeState {
  wallet: Wallet | null;
  isFetching: boolean;
  info: PaymentCode | null;
}

export interface WalletState {
  transaction: TransactionState;
  withdraw: WithdrawState;
  transfer: TransferState;
  investment: InvestmentState;
  subscription: SubscriptionState;
  coinService: CoinService;
  lending: LendingState;
  swap: SwapState;
  childrenStatistic: {
    isFetching: boolean;
    from: Date;
    to: Date;
    totalSwapAmas: number;
    totalLendingUsdt: number;
    totalApoint: number;
  };
  paymentCode: PaymentCodeState;
  coinById: object;
  isGotCoin: boolean;
  isGotWallet: boolean;
  walletByCoin: object; //key is coin id, value is Wallet Type
  //
  isFetching: boolean;
  showSendModal: boolean;
  showReceiveModal: boolean;
  showObtainModal: boolean;
  amount: number;
  token: string;
  amountError: null | string;
  receiver: string;
  receiverError: null | string;
  resourceType: ResourceType;
  duration: number;
  amountToFreeze: number;
  amountToFreezeError: null | string;
  confirm: boolean;
}

export type ResourceType = 'BANDWIDTH' | 'ENERGY';
