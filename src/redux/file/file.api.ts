import { BaseResponse, commonApi } from '../common';
import { UploadType } from './file.enterface';

function updateFiles(
  data,
  type: UploadType,
): Promise<BaseResponse<string[]> | null> {
  const api = '/file/v2/upload/' + type;
  return commonApi.fetchData<string[]>(api, 'post', data);
}
export const fileApi = {
  updateFiles,
};
