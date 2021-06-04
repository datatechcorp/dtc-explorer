import produce from 'immer';
import _ from 'lodash';

import { Action } from '../../common';
import { commonHandler } from '../../common/common.reducer';
import { walletInitialState } from './wallet.initial-state';
import { EnterpriseWalletState } from './wallet.interface';
import { Types } from './wallet.action';

const rawReducer = (
  state: EnterpriseWalletState,
  action: Action,
): EnterpriseWalletState => {
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

export const enterpriseWalletReducer = produce(rawReducer, walletInitialState);
