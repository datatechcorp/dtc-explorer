import { commonApi } from '../common';

function updateFile(data) {
  const api = '/upload/';
  return commonApi.flexFetchData<string>(api, 'post', data);
}
export const fileApi = {
  updateFile,
};
