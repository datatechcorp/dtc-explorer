import { UserInfo } from './user';
import { Address } from './address';
import { Wallet } from '../redux/wallet';

export interface ProductInOrder {
  product: string;
  name: string;
  description: string;
  price: number;
  discount_rate: number;
  thumbnail: string;
  quantity: number;
  bonus_rate?: number;
}

export enum OrderStatus {
  WaitForPaying = 'wait-for-paying',
  Paid = 'paid',
  Shipping = 'shipping',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

export function getOrderStatusColor(status: OrderStatus): string {
  let color = 'orange';
  if (status === OrderStatus.Completed) {
    color = 'green';
  } else if (status === OrderStatus.Cancelled) {
    color = 'red';
  } else if (status === OrderStatus.Paid) {
    color = 'geekblue';
  } else if (status === OrderStatus.Shipping) {
    color = 'cyan';
  }
  return color;
}

export enum PaymentMethod {
  BTC = 'BTC',
  ETH = 'ETH',
  VISA = 'VISA',
  SCV = 'SCV',
  USD = 'USD',
  AMAS = 'AMAS',
}

export interface Order {
  _id: string;
  user: string | UserInfo;
  enterprise_user: string | UserInfo;
  products: ProductInOrder[];
  discount_code?: string;
  original_amount: number;
  shipping_amount: number;
  discount_amount: number;
  amount: number;
  usdt_quantity: number;
  coin_quantity: number;
  coin_price: number;
  coin_symbol: string;
  code: string;
  payment_wallet?: Wallet;
  ship_address?: string | Address;
  cart: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  without_product?: boolean;
  received_coin_amount?: number;
  received_coin_address?: string;
  created_by?: 'enterprise' | 'user';
  total_refund_amount_enterprise?: number;
  remain_refund_amount_enterprise?: number;
  enterprise_received_usdt_amount: number;
  enterprise_received_coin_amount: number;
}
