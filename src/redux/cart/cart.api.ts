import { Cart } from './cart.interface';
import { BaseResponse, commonApi } from '../common';
import { UpdateCartDto } from './dto';

function getCart(): Promise<BaseResponse<Cart[]> | null> {
  const api = '/cart/me';
  return commonApi.fetchData<Cart[]>(api);
}

function updateCart(data: UpdateCartDto): Promise<BaseResponse<Cart[]> | null> {
  const api = '/cart/update/me';
  return commonApi.fetchData<Cart[]>(api, 'post', data);
}

export const cartApi = {
  getCart,
  updateCart,
};
