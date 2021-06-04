import { BaseResponse, commonApi } from '../common';
import { Partner } from './partner.interface';

function getPartners(): Promise<BaseResponse<Partner[]> | null> {
  const api = '/partner/get';
  return commonApi.fetchData<Partner[]>(api);
}

export const partnerApi = {
  getPartners,
};
