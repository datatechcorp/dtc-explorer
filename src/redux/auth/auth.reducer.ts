import produce from 'immer';
import _ from 'lodash';

import { Action } from '../common';
import { commonHandler } from '../common/common.reducer';
import { initialState } from './auth.initial-state';
import { AuthState } from './auth.interface';
import { Types } from './auth.action';

export * from './auth.interface';

const rawReducer = (state: AuthState, action: Action): AuthState => {
  state = commonHandler(state, action, initialState);
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

export const authReducer = produce(rawReducer, initialState);
