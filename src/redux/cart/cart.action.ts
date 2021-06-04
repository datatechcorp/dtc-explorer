import { cartApi } from './cart.api';
import { Action, createAction } from '../common';
import { notification } from '../../utils/notification';
import { UpdateCartDto } from './dto';

export const Types = {
  changeFields: 'app.cart.change-fields',
  resetCart: 'app.cart.reset',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const reset = (): Action => createAction(Types.resetCart);

const getCart = () => async (dispatch): Promise<boolean> => {
  dispatch(
    changeFields({
      isFetching: true,
    }),
  );
  const response = await cartApi.getCart();
  dispatch(
    changeFields({
      isFetching: false,
    }),
  );
  if (!response) {
    notification.error('Please check your network');
    return false;
  }
  if (response.code !== 200) {
    notification.error(response.message);
    return false;
  }
  dispatch(
    changeFields({
      cart: response.data,
      isGot: true,
    }),
  );
  return true;
};

const updateCart = (data: UpdateCartDto) => async (
  dispatch,
  getState,
): Promise<boolean> => {
  dispatch(
    changeFields({
      isFetching: true,
    }),
  );
  const response = await cartApi.updateCart(data);
  dispatch(
    changeFields({
      isFetching: false,
    }),
  );
  if (!response) {
    notification.error('Please check your network');
    return false;
  }
  if (response.code !== 200) {
    notification.error(response.message);
    return false;
  }
  notification.success('Update cart successfully!', undefined, 1000);
  const oldSelectedCart = getState().cart.selectedCart;
  let newSelectedCart: any = null;
  if (oldSelectedCart) {
    newSelectedCart = response.data.find(
      (item) => item._id === oldSelectedCart._id,
    );
  }
  dispatch(
    changeFields({
      cart: response.data,
      selectedCart: newSelectedCart,
    }),
  );
  return true;
};

export const cartAction = {
  changeFields,
  getCart,
  updateCart,
  reset,
};
