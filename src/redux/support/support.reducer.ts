import produce from 'immer';
import _ from 'lodash';

import { Action } from '../common';
import { commonHandler } from '../common/common.reducer';
import { Types } from './support.action';
import { supportInitialState } from './support.initial-state';
import { SupportState } from './support.interface';

export * from './support.interface';

const rawReducer = (state: SupportState, action: Action): SupportState => {
  state = commonHandler(state, action, supportInitialState);
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

export const supportReducer = produce(rawReducer, supportInitialState);
