import { Action, commonAction, createAction } from '../common';
import { notification } from '../../utils/notification';
import { GetPriceHistoryDto } from './dto';
import { priceHistoryApi } from './price-history.api';
import _ from 'lodash';

export const Types = {
  changeFields: 'app.price-history.change-fields',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const getPriceHistories = (query: GetPriceHistoryDto) => async (
  dispatch,
): Promise<boolean> => {
  const result = await commonAction.validate(query, GetPriceHistoryDto);
  if (!_.isEmpty(result.errors)) {
    dispatch(changeFields(result.errors));
    return false;
  }

  dispatch(
    changeFields({
      isFetching: true,
      data: [],
    }),
  );
  const response = await priceHistoryApi.getPriceHistories(result.data);
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
      data: response.data.histories,
      price: response.data.price,
      changedDeltaPercent: response.data.changedDeltaPercent,
    }),
  );
  return true;
};

export const priceHistoryAction = {
  changeFields,
  getPriceHistories,
};
