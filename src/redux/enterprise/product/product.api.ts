import { BaseResponse, commonApi } from '../../common';
import { Product, ProductStatisticItem } from './product.interface';
import { UpdateProductInfoDto, ProductDto } from './dto';

function getProducts(): Promise<BaseResponse<Product[]> | null> {
  const api = '/product/enterprise/me';
  return commonApi.fetchData<Product[]>(api);
}

function updateProduct(
  data: UpdateProductInfoDto,
): Promise<BaseResponse<any> | null> {
  const api = '/product/enterprise/update';
  return commonApi.fetchData<any>(api, 'post', data);
}

function addProduct(data: ProductDto): Promise<BaseResponse<Product> | null> {
  const api = '/product/enterprise/create';
  return commonApi.fetchData<Product>(api, 'post', data);
}

function getProductDetail(id: string): Promise<BaseResponse<Product> | null> {
  const api = '/product/enterprise/detail?_id=' + id;
  return commonApi.fetchData<Product>(api);
}

function getProductStatistic(): Promise<BaseResponse<
  ProductStatisticItem[]
> | null> {
  const api = '/product/enterprise/statistic';
  return commonApi.fetchData<ProductStatisticItem[]>(api);
}

export const productApi = {
  getProducts,
  addProduct,
  updateProduct,
  getProductDetail,
  getProductStatistic,
};
