export interface PriceHistoryState {
  isFetching: boolean;
  start_time: Date | undefined;
  end_time: Date | undefined;
  data: any[];
  price: number;
  changedDeltaPercent: number;
}
