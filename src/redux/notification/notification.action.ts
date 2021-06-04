import { Action, createAction } from '../common';
import { notificationApi } from './notification.api';
import { notification } from '../../utils/notification';

export const Types = {
  changeFields: 'app.notification.change-fields',
  markRead: 'app.notification.mark-read',
};
const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const getMyNotification = () => async (dispatch): Promise<boolean> => {
  dispatch(
    changeFields({
      isFetching: true,
      data: [],
    }),
  );
  const response = await notificationApi.getMyNotification();
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
    }),
  );
  return true;
};

const markReadNotification = (id: string) => async (
  dispatch,
): Promise<boolean> => {
  dispatch(
    changeFields({
      isFetching: true,
    }),
  );
  const response = await notificationApi.markReadNotification(id);
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
  dispatch(createAction(Types.markRead, id));
  return true;
};
export const notificationAction = {
  changeFields,
  getMyNotification,
  markReadNotification,
};
