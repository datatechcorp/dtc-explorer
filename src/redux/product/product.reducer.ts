import produce from 'immer';
import _ from 'lodash';

import { Action } from '../common';
import { commonHandler } from '../common/common.reducer';
import { productInitialState } from './product.initial-state';
import { ProductState } from './product.interface';
import { Types } from './product.action';

export * from './product.interface';

const rawReducer = (state: ProductState, action: Action): ProductState => {
  state = commonHandler(state, action, productInitialState);
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

export const productReducer = produce(rawReducer, productInitialState);
