import { BaseResponse, commonApi } from '../common';
import { AddCommentDto, AddSupportDto } from './dto';
import { CustomerSupport } from './support.interface';

function addSupport(
  data: AddSupportDto,
): Promise<BaseResponse<CustomerSupport> | null> {
  const api = '/support/add';
  return commonApi.fetchData<CustomerSupport>(api, 'post', data);
}

function getMySupports(): Promise<BaseResponse<CustomerSupport[]> | null> {
  const api = '/support/history';
  return commonApi.fetchData<CustomerSupport[]>(api);
}

function getDetail(id: string): Promise<BaseResponse<CustomerSupport> | null> {
  const api = '/support/detail?_id=' + id;
  return commonApi.fetchData<CustomerSupport>(api);
}

function addComment(
  data: AddCommentDto,
): Promise<BaseResponse<CustomerSupport> | null> {
  const api = '/support/reply';
  return commonApi.fetchData<CustomerSupport>(api, 'post', data);
}

export const supportApi = {
  addSupport,
  getMySupports,
  getDetail,
  addComment,
};
