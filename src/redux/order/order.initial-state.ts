import { OrderState } from './order.interface';

export const orderInitialState: OrderState = {
  isFetching: false,
  myOrder: {
    isFetching: false,
    page: 0,
    totalPage: 1,
    data: [],
    status: null,
  },
  currentOrder: null,
  isConfirmCurrentOrder: false,
};
