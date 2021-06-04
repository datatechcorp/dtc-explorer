import produce from 'immer';
import _ from 'lodash';

import { Action } from '../common';
import { commonHandler } from '../common/common.reducer';
import { walletInitialState } from './wallet.initial-state';
import { WalletState } from './wallet.interface';
import { Types } from './wallet.action';

export * from './wallet.interface';

const rawReducer = (state: WalletState, action: Action): WalletState => {
  state = commonHandler(state, action, walletInitialState);
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

export const walletReducer = produce(rawReducer, walletInitialState);
