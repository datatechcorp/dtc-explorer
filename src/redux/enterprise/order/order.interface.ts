import { OrderStatus, Order } from '../../../models/order';

export interface RevenueStatisticItem {
  _id: string;
  completed_order_count: number;
  pending_order_count: number;
  completed_usdt_amount: number;
  pending_usdt_amount: number;
  completed_coin_amount: number;
  pending_coin_amount: number;
}

export interface RevenueState {
  isFetching: boolean;
  startTime: Date;
  endTime: Date;
  statistics: RevenueStatisticItem[];
}

export interface MyOrderState {
  isFetching: boolean;
  page: number;
  totalPage: number;
  status: OrderStatus | null;
  data: Order[];
}

export interface OrderWithoutProductState {
  info: Order | null;
  payment_code: string | null;
  payment_codeError: string | null;
  amount: number;
  amountError: string | null;
  refund_percent: number;
  refund_percentError: string | null;
}

export interface OrderState {
  isFetching: boolean;
  revenue: RevenueState;
  totalRevenue: RevenueStatisticItem | null;
  myOrder: MyOrderState;
  orderWithoutProduct: OrderWithoutProductState;
}
