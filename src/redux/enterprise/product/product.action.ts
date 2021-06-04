import { productApi } from './product.api';
import { Action, createAction, validate } from '../../common';
import { notification } from '../../../utils/notification';
import { UpdateProductInfoDto, ProductDto } from './dto';
import { RootState } from '../..';
import { Product, ProductStatus, FormState } from './product.interface';
import _ from 'lodash';

export const Types = {
  changeFields: 'app.product.change-fields',
  resetForm: 'app.product.reset-form',
  editProduct: 'app.product.edit-product',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const resetForm = (): Action => createAction(Types.resetForm);

const editProduct = (product: Product | null): Action =>
  createAction(Types.editProduct, product);

const getMyProducts = () => async (dispatch): Promise<boolean> => {
  dispatch(
    changeFields({
      'myProduct.isFetching': true,
      'myProduct.data': [],
    }),
  );
  const response = await productApi.getProducts();
  dispatch(
    changeFields({
      'myProduct.isFetching': false,
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
      'myProduct.data': response.data,
    }),
  );
  return true;
};

const addProduct = (form: FormState) => async (
  dispatch,
  getState,
): Promise<boolean> => {
  const data: ProductDto = {
    ...form,
    discount_rate: form.discount_percent > 0 ? form.discount_percent / 100 : 0,
    thumbnail: form.thumbnail || '',
    category: form.category || '',
  };
  const result = await validate(data, ProductDto, 'form');

  if (!_.isEmpty(result.errors)) {
    dispatch(changeFields(result.errors));
    return false;
  }
  const product = result.data;

  dispatch(
    changeFields({
      isFetching: true,
    }),
  );
  const response = await productApi.addProduct(product);
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
  const state: RootState = getState();
  const newProducts: Product[] = [
    response.data,
    ...state.enterprise.product.myProduct.data,
  ];

  dispatch(
    changeFields({
      'myProduct.data': newProducts,
      'form._id': response.data._id,
    }),
  );
  notification.success('Add product successfully!');
  return true;
};

const updateProduct = (data: UpdateProductInfoDto) => async (
  dispatch,
  getState,
): Promise<boolean> => {
  const result = await validate(data, UpdateProductInfoDto, 'form');

  if (!_.isEmpty(result.errors)) {
    dispatch(changeFields(result.errors));
    return false;
  }
  const product = result.data;

  dispatch(
    changeFields({
      'myProduct.isFetching': true,
    }),
  );
  const response = await productApi.updateProduct(product);
  dispatch(
    changeFields({
      'myProduct.isFetching': false,
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
  const state: RootState = getState();
  const newProducts: Product[] = [];
  state.enterprise.product.myProduct.data.forEach((product) => {
    if (product._id === data._id) {
      if (data.status === ProductStatus.Disabled) {
        return;
      }
      newProducts.push({
        ...product,
        ...data,
      });
    } else {
      newProducts.push(product);
    }
  });
  dispatch(
    changeFields({
      'myProduct.data': newProducts,
    }),
  );
  notification.success('Update product successfully!');
  return true;
};

const getProductDetail = (id: string) => async (dispatch): Promise<boolean> => {
  dispatch(
    changeFields({
      isFetching: true,
      selectedProduct: null,
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
      selectedProduct: response.data,
    }),
  );
  return true;
};

const getProductStatistic = () => async (dispatch): Promise<boolean> => {
  dispatch(
    changeFields({
      isFetching: true,
    }),
  );
  const response = await productApi.getProductStatistic();
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
      totalStatistic: response.data,
    }),
  );
  return true;
};
export const productAction = {
  changeFields,
  getMyProducts,
  updateProduct,
  getProductDetail,
  resetForm,
  editProduct,
  addProduct,
  getProductStatistic,
};
