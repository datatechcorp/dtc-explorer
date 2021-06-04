import { BaseResponse, commonApi } from '../common';
import { Product, ProductsByCategoryItem } from './product.interface';
import { GetProductsDto, GetTopProductsQuery } from './dto';

function getProducts(
  query: GetProductsDto,
): Promise<BaseResponse<Product[]> | null> {
  const api = `/product/user/get${commonApi.formatQuery(query)}`;
  return commonApi.fetchData<Product[]>(api);
}
function getTopProducts(
  query: GetTopProductsQuery,
): Promise<BaseResponse<ProductsByCategoryItem[]> | null> {
  const api = '/product/user/top' + commonApi.formatQuery(query);
  return commonApi.fetchData<ProductsByCategoryItem[]>(api);
}
function getProductDetail(id: string): Promise<BaseResponse<Product> | null> {
  const api = '/product/user/detail?_id=' + id;
  return commonApi.fetchData<Product>(api);
}

export const productApi = {
  getProducts,
  getProductDetail,
  getTopProducts,
};
