import { supportApi } from './support.api';
import { Action, commonAction, createAction } from '../common';
import { notification } from '../../utils/notification';
import { AddCommentDto, AddSupportDto } from './dto';
import _ from 'lodash';
import { SupportState } from './support.interface';

export const Types = {
  changeFields: 'app.support.change-fields',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const addSupport = (data: AddSupportDto) => async (
  dispatch,
  getState,
): Promise<boolean> => {
  const { errors, data: validatedData } = await commonAction.validate(
    data,
    AddSupportDto,
    'form',
  );
  console.log('Error', errors);
  if (!_.isEmpty(errors)) {
    dispatch(changeFields(errors));
    return false;
  }
  dispatch(
    changeFields({
      [`isFetching`]: true,
    }),
  );
  const response = await supportApi.addSupport(validatedData);
  dispatch(
    changeFields({
      [`isFetching`]: false,
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
  const state = getState().support as SupportState;
  dispatch(
    changeFields({
      data: [response.data, ...state.supports],
    }),
  );
  return true;
};

const getMySupports = () => async (dispatch, getState): Promise<boolean> => {
  dispatch(
    changeFields({
      [`isFetching`]: true,
      supports: [],
    }),
  );
  const response = await supportApi.getMySupports();
  dispatch(
    changeFields({
      [`isFetching`]: false,
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
      supports: response.data,
    }),
  );
  return true;
};

const getDetail = (id: string) => async (
  dispatch,
  getState,
): Promise<boolean> => {
  dispatch(
    changeFields({
      [`isFetching`]: true,
    }),
  );
  const response = await supportApi.getDetail(id);
  dispatch(
    changeFields({
      [`isFetching`]: false,
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
      supportDetail: response.data,
    }),
  );
  return true;
};

const addComment = (data: AddCommentDto) => async (
  dispatch,
  getState,
): Promise<boolean> => {
  const { errors, data: validatedData } = await commonAction.validate(
    data,
    AddCommentDto,
    'form',
  );
  if (!_.isEmpty(errors)) {
    dispatch(changeFields(errors));
    return false;
  }
  dispatch(
    changeFields({
      [`isFetching`]: true,
    }),
  );
  const response = await supportApi.addComment(validatedData);
  dispatch(
    changeFields({
      [`isFetching`]: false,
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
      supportDetail: response.data,
    }),
  );
  return true;
};

export const supportAction = {
  changeFields,
  addSupport,
  getMySupports,
  getDetail,
  addComment,
};
