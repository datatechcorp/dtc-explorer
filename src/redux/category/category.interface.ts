import { Category, CategoryTreeNode } from '../../models/category';

export interface CategoryState {
  isFetching: boolean;
  isGot: boolean;
  data: Category[];
  tree: CategoryTreeNode[];
}
