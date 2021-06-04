import produce from 'immer';
import _ from 'lodash';

import { Action } from '../common';
import { commonHandler } from '../common/common.reducer';
import { settingInitialState } from './setting.initial-state';
import { SettingState } from './setting.interface';
import { Types } from './setting.action';
import { setting } from '../../config/setting';

export * from './setting.interface';

const rawReducer = (state: SettingState, action: Action): SettingState => {
  if (!setting.productionMode) {
    console.log('Action', action);
  }

  state = commonHandler(state, action, settingInitialState);
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

export const settingReducer = produce(rawReducer, settingInitialState);
