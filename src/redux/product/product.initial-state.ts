import { ProductState } from './product.interface';

export const productInitialState: ProductState = {
  isFetching: false,
  productsByCategory: [],
  bestSaleProduct: {
    isFetching: false,
    count: 0,
    page: 0,
    totalPage: 1,
    type: 'best-sales',
    limit: 8,
    data: [],
  },
  bestDiscountProduct: {
    isFetching: false,
    count: 0,
    page: 0,
    totalPage: 1,
    type: 'best-discount',
    limit: 12,
    data: [],
  },
  newProduct: {
    isFetching: false,
    count: 0,
    page: 0,
    totalPage: 1,
    type: 'new',
    limit: 12,
    data: [],
  },
  commonProduct: {
    isFetching: false,
    count: 0,
    page: 0,
    totalPage: 1,
    type: 'new',
    limit: 20,
    data: [],
    searchText: '',
    category: undefined,
  },
  relatedProduct: {
    isFetching: false,
    count: 0,
    page: 0,
    totalPage: 1,
    type: 'new',
    limit: 20,
    data: [],
    category: undefined,
  },
  productDetail: {
    product: null,
    quantity: 1,
  },
};