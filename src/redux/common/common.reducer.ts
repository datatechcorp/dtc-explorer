import { Action, AppTypes } from './common.action';

export const commonHandler = (
  state: any,
  action: Action,
  initialState: any,
): any => {
  switch (action.type) {
    case AppTypes.reset:
      return initialState;
    default:
      return state;
  }
};
