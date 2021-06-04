import { Country } from '../../models/country';
import { AddressType, Address } from '../../models/address';

export interface AddressForm {
  _id: string | null;
  first_name: string;
  first_nameError: string | null;
  last_name: string;
  last_nameError: string | null;
  phone: string;
  phoneError: string | null;
  address: string;
  addressError: string | null;
  apartment: string;
  apartmentError: string | null;
  city: string;
  cityError: string | null;
  country: Country | null;
  countryError: string | null;
  postal_code: string;
  postal_codeError: string | null;
  type: AddressType;
}

export interface AddressState {
  isFetching: boolean;
  data: Address[];
  isGotCountry: boolean;
  countries: Country[];
  form: AddressForm;
}
