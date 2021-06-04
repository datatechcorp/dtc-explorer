import { UserInfo } from './user';
import { Currency } from './balance';
import { Wallet } from '../redux/wallet';

export interface PaymentCode {
  _id: string;
  user: string | UserInfo;
  code: string;
  wallet: string | Wallet;
  expiredAt: string;
}
