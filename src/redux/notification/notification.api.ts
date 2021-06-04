import { BaseResponse, commonApi } from '../common';

function getMyNotification(): Promise<BaseResponse<Notification[]> | null> {
  const api = '/notification/me';
  return commonApi.fetchData<Notification[]>(api);
}
function markReadNotification(
  id: string,
): Promise<BaseResponse<Notification> | null> {
  const api = '/notification/mark-read';
  return commonApi.fetchData<Notification>(api, 'post', { _id: id });
}
export const notificationApi = {
  getMyNotification,
  markReadNotification,
};
