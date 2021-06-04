import produce from 'immer';
import _ from 'lodash';

import { Action } from '../common';
import { commonHandler } from '../common/common.reducer';
import { txInitialState } from './tx.initial-state';
import { TxState } from './tx.interface';
import { Types } from './tx.action';

export * from './tx.interface';

const rawReducer = (state: TxState, action: Action): TxState => {
  state = commonHandler(state, action, txInitialState);
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

export const txReducer = produce(rawReducer, txInitialState);
