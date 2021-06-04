import { BaseResponse, commonApi } from '../common';
import {
  GetOrdersDto,
  ChangeOrderStatusDto,
  CreateOrderFromCartDto,
} from './dto';
import { Order } from '../../models/order';

function getMyOrders(
  query: GetOrdersDto,
): Promise<BaseResponse<Order[]> | null> {
  const api = `/order/user/me${commonApi.formatQuery(query)}`;
  return commonApi.fetchData<Order[]>(api);
}

function changeOrderStatus(
  data: ChangeOrderStatusDto,
): Promise<BaseResponse<any> | null> {
  const api = '/order/user/change-status';
  return commonApi.fetchData<any>(api, 'post', data);
}

function checkout(
  query: CreateOrderFromCartDto,
): Promise<BaseResponse<Order> | null> {
  const api = `/order/user/checkout${commonApi.formatQuery(query)}`;
  return commonApi.fetchData<Order>(api);
}

function confirm(
  data: CreateOrderFromCartDto,
): Promise<BaseResponse<Order> | null> {
  const api = '/order/user/confirm';
  return commonApi.fetchData<Order>(api, 'post', data);
}

export const orderApi = {
  checkout,
  confirm,
  changeOrderStatus,
  getMyOrders,
};
