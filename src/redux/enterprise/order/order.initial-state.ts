import { OrderState } from './order.interface';

export const orderInitialState: OrderState = {
  isFetching: false,
  revenue: {
    isFetching: false,
    startTime: new Date(Date.now() - 30 * 86400000),
    endTime: new Date(),
    statistics: [],
  },
  totalRevenue: null,
  myOrder: {
    isFetching: false,
    page: 0,
    totalPage: 1,
    data: [],
    status: null,
  },
  orderWithoutProduct: {
    info: null,
    payment_code: '',
    payment_codeError: null,
    amount: 0,
    amountError: null,
    refund_percent: 5,
    refund_percentError: null,
  },
};
