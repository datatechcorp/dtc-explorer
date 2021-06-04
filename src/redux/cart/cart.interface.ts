import { Product } from '../product';
import { Address } from '../../models/address';
import { UserInfo } from '../../models/user';
import { PaymentMethod } from '../../models/order';
import { Coin, Wallet } from '../wallet';

export interface ProductInCart {
  product: Product;
  quantity: number;
}

export enum CartStatus {
  Active = 'active',
  Disabled = 'disabled',
}

export interface Cart {
  _id: string;
  products: ProductInCart[];
  enterprise_user: string | UserInfo;
  amount: number;
  status: CartStatus;
}

export interface CartState {
  isFetching: boolean;
  isGot: boolean;
  cart: Cart[];
  selectedCart: Cart | null;
  selectedAddress: Address | null;
  paymentWallet: Wallet | null;
  paymentCoin: Coin | null;
}
