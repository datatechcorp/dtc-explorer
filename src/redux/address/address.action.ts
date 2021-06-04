import { notification } from '../../utils/notification';
import { Action, createAction, commonAction } from '../common';
import { addressApi } from './address.api';
import { AddressDto } from './dto';
import { AddressForm } from './address.interface';
import _ from 'lodash';
import { Address } from '../../models/address';

export const Types = {
  changeFields: 'app.address.change-fields',
  editAddress: 'app.address.edit',
  resetForm: 'app.address.reset-form',
  createOrUpdateAddressSuccess: 'app.address.create-or-update',
};

const editAddress = (address: Address): Action =>
  createAction(Types.editAddress, address);

const resetForm = (): Action => createAction(Types.resetForm);

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const getAddress = (query: AddressDto) => async (
  dispatch,
): Promise<boolean> => {
  dispatch(
    changeFields({
      isFetching: true,
      data: [],
    }),
  );
  const response = await addressApi.getAddress(query);
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
      data: response.data,
    }),
  );
  return true;
};

const getCountries = () => async (dispatch): Promise<boolean> => {
  dispatch(
    changeFields({
      isFetching: true,
      countries: [],
    }),
  );
  const response = await addressApi.getCountries();
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
      isGotCountry: true,
      countries: response.data,
    }),
  );
  return true;
};

const updateAddress = (form: AddressForm) => async (
  dispatch,
): Promise<boolean> => {
  let country;
  if (form.country) {
    country = form.country._id;
  }
  const newForm = { ...form, country };
  const { errors, data } = await commonAction.validate(
    newForm,
    AddressDto,
    'form',
  );

  if (!_.isEmpty(errors)) {
    dispatch(changeFields(errors));
    return false;
  }

  dispatch(
    changeFields({
      isFetching: true,
    }),
  );
  const response = await addressApi.updateAddress(data);
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
  dispatch(createAction(Types.createOrUpdateAddressSuccess, response.data));
  notification.success('Update address successfully');
  return true;
};

export const addressAction = {
  changeFields,
  getAddress,
  getCountries,
  updateAddress,
  editAddress,
  resetForm,
};
