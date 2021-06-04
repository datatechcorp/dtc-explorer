import { productApi } from './product.api';
import { Action, createAction } from '../common';
import { notification } from '../../utils/notification';
import { GetProductsDto, GetTopProductsQuery } from './dto';

export const Types = {
  changeFields: 'app.product.change-fields',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const getProducts = (query: GetProductsDto, prefix: string) => async (
  dispatch,
): Promise<boolean> => {
  dispatch(
    changeFields({
      [`${prefix}.isFetching`]: true,
      [`${prefix}.data`]: [],
    }),
  );
  const response = await productApi.getProducts(query);
  dispatch(
    changeFields({
      [`${prefix}.isFetching`]: false,
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
      [`${prefix}.page`]: query.page,
      [`${prefix}.count`]: response.count as number,
      [`${prefix}.totalPage`]: response.total_page as number,
      [`${prefix}.data`]: response.data,
      [`${prefix}.searchText`]: query.text,
    }),
  );
  return true;
};

const getProductDetail = (id: string) => async (dispatch): Promise<boolean> => {
  dispatch(
    changeFields({
      isFetching: true,
      'productDetail.product': null,
    }),
  );
  const response = await productApi.getProductDetail(id);
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
      'productDetail.product': response.data,
      'productDetail.quantity': 1,
    }),
  );
  return true;
};

const getTopProducts = (query: GetTopProductsQuery) => async (
  dispatch,
): Promise<boolean> => {
  dispatch(
    changeFields({
      isFetching: false,
      productsByCategory: [],
    }),
  );
  const response = await productApi.getTopProducts(query);
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
      productsByCategory: response.data,
    }),
  );
  return true;
};
export const productAction = {
  changeFields,
  getProducts,
  getProductDetail,
  getTopProducts,
};
