import produce from 'immer';
import _ from 'lodash';

import { Action } from '../common';
import { commonHandler } from '../common/common.reducer';
import { categoryInitialState } from './category.initial-state';
import { CategoryState } from './category.interface';
import { Types } from './category.action';

export * from './category.interface';

const rawReducer = (state: CategoryState, action: Action): CategoryState => {
  state = commonHandler(state, action, categoryInitialState);
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

export const categoryReducer = produce(rawReducer, categoryInitialState);
