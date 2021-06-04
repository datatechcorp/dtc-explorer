import { OrderStatus, Order } from '../../models/order';

export interface MyOrderState {
  isFetching: boolean;
  page: number;
  totalPage: number;
  status: OrderStatus | null;
  data: Order[];
}

export interface OrderState {
  isFetching: boolean;
  myOrder: MyOrderState;
  currentOrder: Order | null;
  isConfirmCurrentOrder: boolean;
}
