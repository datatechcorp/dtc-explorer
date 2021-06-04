import { UserInfo } from '../../../models/user';
import { Category } from '../../../models/category';

export interface Product {
  _id: string;
  enterprise_user: string | UserInfo;
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
  international_shipping_fee: number;
  national_shipping_fee: number;
}

export interface ProductStatisticItem {
  _id: string;
  count: number;
}

export enum ProductStatus {
  Active = 'active',
  Blocked = 'blocked',
  Disabled = 'disabled',
  Pending = 'pending',
}

export interface MyProductState {
  data: Product[];
  page: number;
  totalPage: number;
  isFetching: boolean;
}

export interface FormState {
  _id: string | null;
  name: string;
  description: string;
  full_description: string;
  sku: string;
  price: number;
  is_limit_quantity: boolean;
  quantity: number;
  discount_percent: number;
  discount_percentError: string | null;
  thumbnail: string | null;
  images: string[];
  category: string | null;
  status: ProductStatus;

  nameError: string | null;
  descriptionError: string | null;
  full_descriptionError: string | null;
  skuError: string | null;
  priceError: string | null;
  quantityError: string | null;
  thumbnailError: string | null;
  imagesError: string | null;
  categoryError: string | null;

  international_shipping_fee: number;
  international_shipping_feeError: string | null;

  national_shipping_fee: number;
  national_shipping_feeError: string | null;
}

export interface ProductState {
  isFetching: boolean;
  myProduct: MyProductState;
  selectedProduct: Product | null;
  form: FormState;
  totalStatistic: ProductStatisticItem[];
}
