import produce from 'immer';
import _ from 'lodash';

import { Action } from '../common';
import { commonHandler } from '../common/common.reducer';
import { userInitialState } from './user.initial-state';
import { UserState } from './user.interface';
import { Types } from './user.action';

const rawUserReducer = (state: UserState, action: Action): UserState => {
  state = commonHandler(state, action, userInitialState);
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

    case Types.setInfo:
      if (data) {
        for (const key in data) {
          if (typeof data[key] !== 'undefined') {
            _.set(state, `info.${key}`, action.data[key]);
          }
        }
      }
      return state;
    default:
      return state;
  }
};

export const userReducer: (
  state: UserState,
  action: Action,
) => UserState = produce(rawUserReducer, userInitialState);
