import { orderApi } from './order.api';
import _ from 'lodash';
import { Action, createAction, commonAction } from '../../common';
import { notification } from '../../../utils/notification';
import {
  GetOrdersDto,
  ChangeOrderStatusDto,
  CreateOrderWithoutProductDto,
} from './dto';
import { RootState } from '../..';

export const Types = {
  changeFields: 'app.order.change-fields',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const getRevenueStatisticsByDate = (startTime, endTime) => async (
  dispatch,
): Promise<boolean> => {
  dispatch(
    changeFields({
      'revenue.isFetching': true,
    }),
  );
  const response = await orderApi.getRevenueStatisticsByDate(
    startTime,
    endTime,
  );
  dispatch(
    changeFields({
      'revenue.isFetching': false,
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
      'revenue.statistics': response.data,
    }),
  );
  return true;
};

const getRevenueStatistics = () => async (dispatch): Promise<boolean> => {
  dispatch(
    changeFields({
      isFetching: true,
    }),
  );
  const response = await orderApi.getRevenueStatistics();
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
      totalRevenue: response.data.length > 0 ? response.data[0] : null,
    }),
  );
  return true;
};

const getMyOrders = (query: GetOrdersDto) => async (
  dispatch,
): Promise<boolean> => {
  dispatch(
    changeFields({
      'myOrder.isFetching': true,
      'myOrder.data': [],
    }),
  );
  const response = await orderApi.getOrders(query);
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

const getOrderDetail = (code: string) => async (
  dispatch,
  getState,
): Promise<boolean> => {
  dispatch(
    changeFields({
      'myOrder.isFetching': true,
    }),
  );
  const response = await orderApi.getOrderDetail(code);
  dispatch(
    changeFields({
      'myOrder.isFetching': false,
    }),
  );
  if (!response) {
    notification.error('Please check your network');
    return false;
  }
  if (response.code !== 200 || !response.data) {
    notification.error(response.message);
    return false;
  }

  const rootState: RootState = getState();
  dispatch(
    changeFields({
      'myOrder.data': [
        response.data,
        ...rootState.order.myOrder.data.filter((item) => item.code !== code),
      ],
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
    }),
  );
  const response = await orderApi.changeOrderStatus(data);
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
    }),
  );
  return true;
};

const createOrderWithoutProduct = (
  data: CreateOrderWithoutProductDto,
) => async (dispatch, getState): Promise<boolean> => {
  const { errors, data: validatedData } = await commonAction.validate(
    data,
    CreateOrderWithoutProductDto,
    'orderWithProduct',
  );

  if (!_.isEmpty(errors)) {
    dispatch(changeFields(errors));
    return false;
  }

  dispatch(
    changeFields({
      'myOrder.isFetching': true,
    }),
  );
  const response = await orderApi.createOrderWithoutProduct(validatedData);
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
  const rootState: RootState = getState();
  notification.success('Create order successfully!');
  dispatch(
    changeFields({
      'orderWithoutProduct.info': response.data.order,
    }),
  );
  return true;
};

const changeOrderStatusOnLocal = (data: ChangeOrderStatusDto) => async (
  dispatch,
  getState,
): Promise<boolean> => {
  const rootState: RootState = getState();
  dispatch(
    changeFields({
      'myOrder.data': rootState.order.myOrder.data.map((item) => {
        if (item._id === data._id) {
          return { ...item, status: data.status };
        }
        return item;
      }),
    }),
  );
  return true;
};

export const orderAction = {
  getRevenueStatistics,
  getRevenueStatisticsByDate,
  changeFields,
  getMyOrders,
  changeOrderStatus,
  getOrderDetail,
  createOrderWithoutProduct,
  changeOrderStatusOnLocal,
};
