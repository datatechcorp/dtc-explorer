import produce from 'immer';
import _ from 'lodash';

import { Action } from '../common';
import { commonHandler } from '../common/common.reducer';
import { Types } from './partner.action';
import { setting } from '../../config/setting';
import { PartnerState } from './partner.interface';
import { partnerInitialState } from './partner.initial-state';

export * from './partner.interface';

const rawReducer = (state: PartnerState, action: Action): PartnerState => {
  state = commonHandler(state, action, partnerInitialState);
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

export const partnerReducer = produce(rawReducer, partnerInitialState);
