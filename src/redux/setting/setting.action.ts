import { Action, createAction } from '../common';

export const Types = {
  changeFields: 'app.setting.change-fields',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

export const settingAction = {
  changeFields,
};
