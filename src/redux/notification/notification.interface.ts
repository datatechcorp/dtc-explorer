import { UserInfo } from '../../models/user';

export enum NotificationType {
  NewOrder = 'new-order',
  ChangeOrderStatus = 'change-order-status',
  ChangeWalletAmount = 'change-wallet-amount',
}

export interface Notification {
  _id: string;
  user: string | UserInfo;
  message: string;
  had_read: boolean;
  is_enterprise_notification: boolean;
  type: NotificationType;
  data: string;
  createdAt: string;
  from_admin?: boolean;
}

export interface NotificationState {
  isFetching: boolean;
  data: Notification[];
}
