import produce from 'immer';
import _ from 'lodash';

import { Action } from '../common';
import { commonHandler } from '../common/common.reducer';
import { blockInitialState } from './block.initial-state';
import { BlockState } from './block.interface';
import { Types } from './block.action';

export * from './block.interface';

const rawReducer = (state: BlockState, action: Action): BlockState => {
  state = commonHandler(state, action, blockInitialState);
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

export const blockReducer = produce(rawReducer, blockInitialState);
