import { CategoryState } from './category.interface';

export const categoryInitialState: CategoryState = {
  isFetching: false,
  isGot: false,
  data: [],
  tree: [],
};
