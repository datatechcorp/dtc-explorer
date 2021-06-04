import { RevenueStatisticItem } from './order.interface';
import { BaseResponse, commonApi } from '../../common';
import {
  GetOrdersDto,
  ChangeOrderStatusDto,
  CreateOrderWithoutProductDto,
} from './dto';
import { Order } from '../../../models/order';
import { UserInfo } from '../../../models/user';

function getRevenueStatisticsByDate(
  startTime: Date,
  endTime: Date,
): Promise<BaseResponse<RevenueStatisticItem[]> | null> {
  const api = `/order/enterprise/get-statistic-by-date?start_time=${startTime.toISOString()}&end_time=${endTime.toISOString()}`;
  return commonApi.fetchData<RevenueStatisticItem[]>(api);
}

function getOrders(query: GetOrdersDto): Promise<BaseResponse<Order[]> | null> {
  const api = `/order/enterprise/get${commonApi.formatQuery(query)}`;
  return commonApi.fetchData<Order[]>(api);
}

function changeOrderStatus(
  data: ChangeOrderStatusDto,
): Promise<BaseResponse<any> | null> {
  const api = '/order/enterprise/change-status';
  return commonApi.fetchData<any>(api, 'post', data);
}

function getRevenueStatistics(): Promise<BaseResponse<
  RevenueStatisticItem[]
> | null> {
  const api = '/order/enterprise/statistic';
  return commonApi.fetchData<RevenueStatisticItem[]>(api);
}

function getOrderDetail(code: string): Promise<BaseResponse<Order> | null> {
  const api = `/order/enterprise/detail${commonApi.formatQuery({ code })}`;
  return commonApi.fetchData<Order>(api);
}

function createOrderWithoutProduct(
  data: CreateOrderWithoutProductDto,
): Promise<BaseResponse<{ order: Order; user: UserInfo }> | null> {
  const api = '/order/create-order-without-product';
  return commonApi.fetchData<{ order: Order; user: UserInfo }>(
    api,
    'post',
    data,
  );
}

export const orderApi = {
  getRevenueStatisticsByDate,
  getOrders,
  changeOrderStatus,
  getRevenueStatistics,
  getOrderDetail,
  createOrderWithoutProduct,
};
