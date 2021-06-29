import { commonApi } from '../common';
import {
  RecordContr,
  RecordContrRequest,
  TxResponse,
  TxsResponse,
} from './tx.interface';
import { GetTxsDto } from './dto';

function getTxs(query: Partial<GetTxsDto>) {
  const api = `/transactions${commonApi.formatQuery(query)}`;
  return commonApi.fetchData<TxsResponse | null>(api);
}

function getTx(hash: string) {
  const api = `/transactions/${hash}`;
  return commonApi.fetchData<TxResponse | null>(api);
}

function recordContr(data: RecordContrRequest) {
  const api = '/contract';
  return commonApi.flexFetchData<RecordContr>(api, 'POST', data);
}

export const txApi = {
  getTxs,
  getTx,
  recordContr,
};
