import { BaseResponse, commonApi } from '../common';
import { ConfigDto } from './dto';

function getConfigs(): Promise<BaseResponse<ConfigDto> | null> {
  const api = '/config/get';
  return commonApi.fetchData<ConfigDto>(api);
}

export const settingApi = {
  getConfigs,
};
