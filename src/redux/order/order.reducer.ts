import produce from 'immer';
import _ from 'lodash';

import { Action } from '../common';
import { commonHandler } from '../common/common.reducer';
import { orderInitialState } from './order.initial-state';
import { OrderState } from './order.interface';
import { Types } from './order.action';

export * from './order.interface';

const rawReducer = (state: OrderState, action: Action): OrderState => {
  state = commonHandler(state, action, orderInitialState);
  const data = action.data;
  // const message = action.message;
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

export const orderReducer = produce(rawReducer, orderInitialState);
