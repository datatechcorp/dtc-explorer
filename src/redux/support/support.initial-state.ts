import { SupportState } from './support.interface';

export const supportInitialState: SupportState = {
  isFetching: false,
  supports: [],
  supportDetail: null,
  form: {
    _id: null,
    title: '',
    titleError: null,
    email: '',
    emailError: null,
    content: '',
    contentError: null,
  },
};
