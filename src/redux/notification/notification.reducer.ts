import produce from 'immer';
import _ from 'lodash';
import { Action } from '../common';
import { commonHandler } from '../common/common.reducer';
import { NotificationState } from './notification.interface';
import { notificationInitialState } from './notification.initial-state';
import { Types } from './notification.action';

export * from './notification.interface';

const rawReducer = (
  state: NotificationState,
  action: Action,
): NotificationState => {
  state = commonHandler(state, action, notificationInitialState);
  const data = action.data;
  switch (action.type) {
    case Types.changeFields:
      if (data) {
        for (const key in data) {
          _.set(state, key, action.data[key]);
        }
      }
      return state;

    case Types.markRead: {
      const id = action.data;
      const newNotifications = state.data.map((item) => {
        if (item._id === id) {
          return { ...item, had_read: true };
        }

        return item;
      });
      state.data = newNotifications;
      return state;
    }

    default:
      return state;
  }
};
export const notificationReducer = produce(
  rawReducer,
  notificationInitialState,
);
