import { UserInfo, KycType } from '../../models/user';
import { Address, AddressType } from '../../models/address';
import { Drc10Token, Drc20Token, TokenBase } from '../transaction';

export interface UserForm {
  isFetching: boolean;
  first_name: string;
  first_nameError: string | null;
  last_name: string;
  last_nameError: string | null;
  display_name: string;
  display_nameError: string | null;
  phone: string;
  phoneError: string | null;
  business_name: string;
  business_nameError: string | null;

  address: string;
  addressError: string | null;

  apartment: string;
  apartmentError: string | null;

  city: string;
  cityError: string | null;

  country: string;
  countryError: string | null;

  postal_code: string;
  postal_codeError: string | null;

  country_code: string;
  country_codeError: string | null;

  password: string;
  passwordError: string | null;
  new_password: string;
  new_passwordError: string | null;
  confirm_password: string;
  confirm_passwordError: string | null;

  kyc_fullName: string;
  kyc_fullNameError: string | null;
  kyc_birthday: Date;
  kyc_birthdayError: string | null;
  kyc_address: string;
  kyc_addressError: string | null;
  kyc_type: KycType;
  kyc_number: string;
  kyc_numberError: string | null;
  kyc_provided_date: Date;
  kyc_provided_dateError: string | null;
  kyc_provided_area: string;
  kyc_provided_areaError: string | null;
  kyc_front_image: string;
  kyc_front_imageError: string | null;
  kyc_back_image: string;
  kyc_back_imageError: string | null;
  kyc_selfie_image: string;
  kyc_selfie_imageError: string | null;

  enterprise_name: string;
  enterprise_nameError: string | null;
  enterprise_logo: string;
  enterprise_logoError: string | null;
  enterprise_address: string;
  enterprise_addressError: string | null;
}

export interface AddressForm {
  address: string;
  apartment: string;
  city: string;
  country: string;
  postal_code: string;
  country_code: string;
  type: AddressType;

  addressError: string | null;
  apartmentError: string | null;
  cityError: string | null;
  countryError: string | null;
  postal_codeError: string | null;
  country_codeError: string | null;
  typeError: string | null;
}
export interface AddressState {
  data: Address[];
  form: AddressForm;
}

export interface ChildrenState {
  isGot: boolean;
  data: UserInfo[][];
}

export interface TwoFaState {
  isFetching: boolean;
  two_fa_uri: null | string;
  token: string;
  tokenError: null | string;
}

export interface Device {
  _id: string;
  user: string | UserInfo;
  token: string;
  platform: DevicePlatform;
  status: DeviceStatus;
}

export enum DeviceStatus {
  Blocked = 'blocked',
  Active = 'active',
}

export enum DevicePlatform {
  android = 'android',
  ios = 'ios',
  web = 'web',
}

export interface Asset {
  key: string;
  value: number;
}

export interface UserState {
  isFetching: boolean;
  _id: null | string;
  info: UserInfo;
  two_fa: TwoFaState;
  access_token: null | string;
  form: UserForm;
  address: AddressState;
  myChildren: ChildrenState;
  //
  connected: boolean;
  key: string;
  walletAddress: string;
  balance: number;
  bandwidth: number;
  bandwidthUsed: number;
  energy: number;
  energyUsed: number;
  frozenBalance: number; // = BP
  reward: number;
  asset: Asset[];
  drc10Token: Drc10Token[];
  drc20Token: Drc20Token[];
}
