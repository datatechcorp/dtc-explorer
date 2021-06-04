import { AddressState } from './address.interface';
import { AddressType } from '../../models/address';

export const addressInitialState: AddressState = {
  isFetching: false,
  isGotCountry: false,
  countries: [],
  data: [],
  form: {
    _id: null,
    first_name: '',
    first_nameError: null,
    last_name: '',
    last_nameError: null,
    apartment: '',
    apartmentError: null,
    address: '',
    addressError: null,
    city: '',
    cityError: null,
    country: null,
    countryError: null,
    postal_code: '',
    postal_codeError: null,
    phone: '',
    phoneError: null,
    type: AddressType.Shipping,
  },
};
