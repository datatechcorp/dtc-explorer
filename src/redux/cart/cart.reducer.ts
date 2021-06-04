import produce from 'immer';
import _ from 'lodash';

import { Action } from '../common';
import { commonHandler } from '../common/common.reducer';
import { cartInitialState } from './cart.initial-state';
import { CartState } from './cart.interface';
import { Types } from './cart.action';

export * from './cart.interface';

const rawReducer = (state: CartState, action: Action): CartState => {
  state = commonHandler(state, action, cartInitialState);
  const data = action.data;
  switch (action.type) {
    case Types.changeFields:
      if (data) {
        for (const key in data) {
          _.set(state, key, action.data[key]);
        }
      }
      return state;

    case Types.resetCart:
      return cartInitialState;

    default:
      return state;
  }
};

export const cartReducer = produce(rawReducer, cartInitialState);
