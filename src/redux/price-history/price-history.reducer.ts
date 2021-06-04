import produce from 'immer';
import _ from 'lodash';

import { Action } from '../common';
import { commonHandler } from '../common/common.reducer';
import { Types } from './price-history.action';
import { priceHistoryInitialState } from './price-history.initial-state';
import { PriceHistoryState } from './price-history.interface';

export * from './price-history.interface';

const rawReducer = (
  state: PriceHistoryState,
  action: Action,
): PriceHistoryState => {
  state = commonHandler(state, action, priceHistoryInitialState);
  const data = action.data;
  switch (action.type) {
    case Types.changeFields:
      if (data) {
        for (const key in data) {
          _.set(state, key, action.data[key]);
        }
      }
      return state;

    default:
      return state;
  }
};

export const priceHistoryReducer = produce(
  rawReducer,
  priceHistoryInitialState,
);
