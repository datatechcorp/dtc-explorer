import { BaseResponse, commonApi } from '../common';
import { Category } from '../../models/category';

function getCategories(): Promise<BaseResponse<Category[]> | null> {
  const api = '/category/get';
  return commonApi.fetchData<Category[]>(api);
}

export const categoryApi = {
  getCategories,
};
