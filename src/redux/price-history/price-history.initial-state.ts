import { PriceHistoryState } from './price-history.interface';

export const priceHistoryInitialState: PriceHistoryState = {
  isFetching: false,
  start_time: new Date(Date.now() - 24 * 60 * 60 * 1000),
  end_time: undefined,
  data: [],
  price: 1,
  changedDeltaPercent: 0,
};
