import axios, { Method } from 'axios';
import { BaseResponse } from '.';
import { UserInfo } from '../../models/user';
import { setting } from '../../config/setting';
import { FlexResponse } from './common.interface';

export async function flexFetchData<T>(
  api: string,
  method: Method = 'get',
  data: any = {},
): Promise<FlexResponse<T> | null> {
  if (!setting.productionMode) {
    console.log('Call api', api, method, data);
  }
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data,
  };
  try {
    const res = await axios(api, { ...options, baseURL: setting.backendHost });
    return res.data;
  } catch (err) {
    if (err && err.response) {
      return err.response.data;
    }
    return null;
  }
}

export async function fetchData<T>(
  api: string,
  method: Method = 'get',
  data: any = {},
): Promise<T | null> {
  if (!setting.productionMode) {
    console.log('Call api', api, method, data);
  }
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data,
  };
  try {
    const res = await axios(api, options);
    return res.data;
  } catch (err) {
    if (err && err.response) {
      return err.response.data;
    }
    return null;
  }
}

export const formatQuery = (query: object): string => {
  if (!query) {
    return '';
  }
  let stringQuery = '?';
  for (const key in query) {
    if (typeof query[key] !== 'undefined') {
      stringQuery += `${key}=${query[key]}&`;
    }
  }
  return stringQuery;
};

export const commonApi = {
  flexFetchData,
  fetchData,
  formatQuery,
};
