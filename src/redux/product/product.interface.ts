import { UserInfo } from '../../models/user';
import { Category } from '../../models/category';

export interface Product {
  _id: string;
  user: string | UserInfo;
  name: string;
  description: string;
  full_description: string;
  price: number;
  is_limit_quantity: boolean;
  total_quantity: number;
  sold_quantity: number;
  available_quantity: number;
  discount_rate: number;
  thumbnail: string;
  images: string[];
  category: string | Category;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
  sku: string;
}

export enum ProductStatus {
  Active = 'active',
  Blocked = 'blocked',
  Disabled = 'disabled',
  Pending = 'pending',
}

export interface ProductListState {
  data: Product[];
  page: number;
  totalPage: number;
  type: string;
  limit: number;
  count: number;
  category?: string;
  searchText?: string;
  isFetching: boolean;
}
export interface ProductsByCategoryItem {
  category: Category;
  products: Product[];
  isFetching: boolean;
}

export interface ProductDetailState {
  product: Product | null;
  quantity: number;
}

export interface ProductState {
  isFetching: boolean;
  bestSaleProduct: ProductListState;
  bestDiscountProduct: ProductListState;
  newProduct: ProductListState;
  productsByCategory: ProductsByCategoryItem[];
  commonProduct: ProductListState;
  relatedProduct: ProductListState;
  productDetail: ProductDetailState;
}
