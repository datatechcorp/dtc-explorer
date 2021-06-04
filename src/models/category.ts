export interface Category {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  icon?: string;
  parent_id?: string | Category;
  status: CategoryStatus;
}

export enum CategoryStatus {
  Active = 'active',
  Disabled = 'disabled',
}

export interface CategoryTreeNode {
  label: string;
  _id: string;
  value: string;
  title: string;
  children: CategoryTreeNode[];
}
