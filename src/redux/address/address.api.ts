import { BaseResponse, commonApi } from '../common';
import { AddressDto } from './dto';
import { Country } from '../../models/country';
import { Address } from '../../models/address';

function getAddress(
  query: AddressDto,
): Promise<BaseResponse<Address[]> | null> {
  const api = `/address/me${commonApi.formatQuery(query)}`;
  return commonApi.fetchData<Address[]>(api);
}

function getCountries(): Promise<BaseResponse<Country[]> | null> {
  const api = '/address/country';
  return commonApi.fetchData<Country[]>(api);
}

function updateAddress(
  data: AddressDto,
): Promise<BaseResponse<Address> | null> {
  const api = '/address/update-or-create';
  return commonApi.fetchData<Address>(api, 'post', data);
}
export const addressApi = {
  getAddress,
  updateAddress,
  getCountries,
};
