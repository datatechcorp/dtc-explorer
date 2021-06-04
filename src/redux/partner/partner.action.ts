import { Action, createAction } from '../common';
import { PartnerState } from './partner.interface';
import { partnerApi } from './partner.api';

export const Types = {
  changeFields: 'app.partner.change-fields',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const getPartners = () => async (dispatch, getState): Promise<boolean> => {
  const partnerState = getState().partner as PartnerState;
  if (partnerState.isGot || partnerState.isFetching) {
    return true;
  }
  dispatch(
    changeFields({
      isFetching: true,
    }),
  );
  const response = await partnerApi.getPartners();
  dispatch(
    changeFields({
      isFetching: false,
    }),
  );
  if (!response || response.code !== 200) {
    return false;
  }

  dispatch(
    changeFields({
      data: response.data,
      isGot: true,
    }),
  );
  return true;
};

export const partnerAction = {
  changeFields,
  getPartners,
};
