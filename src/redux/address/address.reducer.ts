import produce from 'immer';
import _ from 'lodash';

import { Action } from '../common';
import { commonHandler } from '../common/common.reducer';
import { addressInitialState } from './address.initial-state';
import { AddressState } from './address.interface';
import { Types } from './address.action';

export * from './address.interface';

const rawReducer = (state: AddressState, action: Action): AddressState => {
  state = commonHandler(state, action, addressInitialState);
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

    case Types.editAddress: {
      state.form = { ...addressInitialState.form };
      for (const key in data) {
        _.set(state, `form.${key}`, data[key]);
      }
      if (typeof data.country === 'string') {
        const country = state.countries.find(
          (item) => item._id === data.country,
        );
        state.form.country = country ? country : null;
      } else {
        state.form.country = data.country;
      }
      return state;
    }

    case Types.resetForm: {
      state.form = { ...addressInitialState.form };
      return state;
    }

    case Types.createOrUpdateAddressSuccess: {
      let existed = false;
      state.data = state.data.map((item) => {
        if (item._id === data._id) {
          existed = true;
          return data;
        }
        return item;
      });
      if (!existed) {
        state.data.unshift(data);
      }
      return state;
    }
    default:
      return state;
  }
};

export const addressReducer = produce(rawReducer, addressInitialState);
