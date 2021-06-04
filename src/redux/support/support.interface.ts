import { UserInfo } from '../../models/user';

export enum CustomerSupportStatus {
  Pending = 'pending',
  Handling = 'handling',
  Resolved = 'resolved',
  Rejected = 'rejected',
}

export interface Comment {
  _id: string;
  user?: UserInfo | string;
  email: string;
  content: string;
  createdAt?: Date;
}

export interface CustomerSupport {
  _id: string;
  title: string;
  comments: Comment[];
  user?: UserInfo | string;
  email: string;
  createdAt?: Date;
  status: CustomerSupportStatus;
}

export interface SupportForm {
  _id: string | null;
  title: string;
  titleError: string | null;
  email: string;
  emailError: string | null;
  content: string;
  contentError: string | null;
}

export interface SupportState {
  supports: CustomerSupport[];
  isFetching: boolean;
  supportDetail: CustomerSupport | null;
  form: SupportForm;
}
