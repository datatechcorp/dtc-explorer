import axios, { Method } from 'axios';
import { BaseResponse } from '.';
import { UserInfo } from '../../models/user';
import { setting } from '../../config/setting';
import { storage } from '../../utils/storage';

export async function flexFetchData<T>(
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

export function fetchData<T>(
  api: string,
  method = 'get',
  data?: any,
): Promise<BaseResponse<T> | null> {
  if (!setting.productionMode) {
    console.log('Call api', api, method, data);
  }
  if (method === 'post' || method === 'POST') {
    return axios
      .post<BaseResponse<T> | null>(api, data)
      .then((response) => {
        if (!setting.productionMode) {
          console.log('Response of', api, response.data);
        }
        return response.data;
      })
      .catch((err) => {
        if (err && err.response) {
          if (err.response.data.code === 401) {
            delete axios.defaults.headers.common['Authorization'];
            storage.saveUser(null, null);
            storage.saveCountry(null);
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
          return err.response.data;
        }
        return null;
      });
  }
  return axios
    .get<BaseResponse<T> | null>(api)
    .then((response) => {
      if (!setting.productionMode) {
        console.log('Response of', api, response.data);
      }
      return response.data;
    })
    .catch((err) => {
      if (err && err.response) {
        if (err.response.data.code === 401) {
          delete axios.defaults.headers.common['Authorization'];
          storage.saveUser(null, null);
          storage.saveCountry(null);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
        return err.response.data;
      }
      return null;
    });
}

function getUserInfo(
  usernameOrEmail: string,
): Promise<BaseResponse<UserInfo> | null> {
  const api = `/user/find?username_or_email=${usernameOrEmail}`;
  return fetchData<UserInfo>(api);
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
  getUserInfo,
  formatQuery,
};
