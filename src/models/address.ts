export enum AddressType {
  Primary = 'primary',
  Billing = 'billing',
  Shipping = 'shipping',
}
export interface Address {
  _id: string;
  user: string;
  address: string;
  apartment: string;
  city: string;
  country: string | Country;
  country_code: string;
  country_phone: string;
  country_name: string;
  postal_code: string;
  phone: string;
  first_name: string;
  last_name: string;
  type: AddressType;
}

export enum CountryStatus {
  Active = 'active',
  Disabled = 'disabled',
}

export interface Country {
  _id: string;
  name: string;
  phone: string;
  code: string;
  status: CountryStatus;
  has_product: boolean;
}
