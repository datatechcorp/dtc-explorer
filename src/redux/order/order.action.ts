import { orderApi } from './order.api';
import { Action, createAction } from '../common';
import { notification } from '../../utils/notification';
import {
  GetOrdersDto,
  ChangeOrderStatusDto,
  CreateOrderFromCartDto,
} from './dto';
import { RootState } from '../index';

export const Types = {
  changeFields: 'app.order.change-fields',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const getMyOrders = (query: GetOrdersDto) => async (
  dispatch,
): Promise<boolean> => {
  dispatch(
    changeFields({
      'myOrder.isFetching': true,
      'myOrder.data': [],
    }),
  );
  const response = await orderApi.getMyOrders(query);
  dispatch(
    changeFields({
      'myOrder.isFetching': false,
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
      'myOrder.data': response.data,
    }),
  );
  return true;
};

const changeOrderStatus = (data: ChangeOrderStatusDto) => async (
  dispatch,
  getState,
): Promise<boolean> => {
  dispatch(
    changeFields({
      'myOrder.isFetching': true,
      isFetching: true,
    }),
  );
  const response = await orderApi.changeOrderStatus(data);
  dispatch(
    changeFields({
      'myOrder.isFetching': false,
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
  const rootState: RootState = getState();
  notification.success('Change order status successfully!');
  dispatch(
    changeFields({
      'myOrder.data': rootState.order.myOrder.data.map((item) => {
        if (item._id === data._id) {
          return { ...item, status: data.status };
        }
        return item;
      }),
      currentOrder:
        rootState.order.currentOrder &&
        rootState.order.currentOrder._id === data._id
          ? { ...rootState.order.currentOrder, status: data.status }
          : rootState.order.currentOrder,
    }),
  );
  return true;
};

const checkout = (query: CreateOrderFromCartDto) => async (
  dispatch,
): Promise<boolean> => {
  dispatch(
    changeFields({
      isFetching: true,
      currentOrder: null,
    }),
  );
  const response = await orderApi.checkout(query);
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
      currentOrder: response.data,
    }),
  );
  return true;
};

const confirm = (data: CreateOrderFromCartDto) => async (
  dispatch,
): Promise<boolean> => {
  dispatch(
    changeFields({
      isFetching: true,
    }),
  );
  const response = await orderApi.confirm(data);
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
      currentOrder: response.data,
    }),
  );
  return true;
};

export const orderAction = {
  changeFields,
  getMyOrders,
  changeOrderStatus,
  checkout,
  confirm,
};
