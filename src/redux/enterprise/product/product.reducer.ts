import produce from 'immer';
import _ from 'lodash';

import { Action } from '../../common';
import { commonHandler } from '../../common/common.reducer';
import { productInitialState } from './product.initial-state';
import { ProductState, Product } from './product.interface';
import { Types } from './product.action';

export * from './product.interface';

const rawReducer = (state: ProductState, action: Action): ProductState => {
  state = commonHandler(state, action, productInitialState);
  const data = action.data;
  switch (action.type) {
    case Types.changeFields:
      if (data) {
        for (const key in data) {
          _.set(state, key, action.data[key]);
        }
      }
      return state;

    case Types.resetForm:
      state.form = { ...productInitialState.form };
      return state;

    case Types.editProduct: {
      const product: Product | null = data;
      state.form = { ...productInitialState.form };
      if (!product) {
        return state;
      }

      state.form._id = product._id;
      state.form.name = product.name;
      state.form.description = product.description;
      state.form.full_description = product.full_description;
      state.form.sku = product.sku;
      state.form.price = product.price;
      state.form.quantity = product.available_quantity;
      state.form.discount_percent =
        product.discount_rate > 0 ? product.discount_rate * 100 : 0;
      state.form.thumbnail = product.thumbnail;
      state.form.images = product.images;
      state.form.category = product.category as string;
      state.form.status = product.status;
      state.form.international_shipping_fee =
        product.international_shipping_fee;
      state.form.national_shipping_fee = product.national_shipping_fee;
      return state;
    }

    default:
      return state;
  }
};

export const productReducer = produce(rawReducer, productInitialState);
