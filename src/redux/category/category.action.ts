import { Action, createAction } from '../common';
import { notification } from '../../utils/notification';
import { categoryApi } from './category.api';
import utils from '../../utils/utils';

export const Types = {
  changeFields: 'app.category.change-fields',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const getCategories = () => async (dispatch, getState): Promise<boolean> => {
  const state = getState().category;
  if (state.isGot || state.isFetching) {
    return Promise.resolve(true);
  }
  dispatch(
    changeFields({
      isFetching: true,
      data: [],
    }),
  );
  const response = await categoryApi.getCategories();
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
      isGot: true,
      data: response.data,
      tree: utils.buildCategoryTree(response.data),
    }),
  );
  return true;
};

export const categoryAction = {
  changeFields,
  getCategories,
};
