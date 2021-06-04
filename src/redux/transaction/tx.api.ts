import { commonApi } from '../common';
import {
  Brc10DeployedTxResponse,
  IssueTokenRequest,
  TxResponse,
  TxsResponse,
} from './tx.interface';
import { GetTxsDto } from './dto';
import { setting } from '../../config/setting';

function getTxs(query: Partial<GetTxsDto>): Promise<TxsResponse | null> {
  const api = `/transactions${commonApi.formatQuery(query)}`;
  return commonApi.flexFetchData<TxsResponse | null>(api);
}

function getTx(hash: string): Promise<TxResponse | null> {
  const api = `/transactions/${hash}`;
  return commonApi.flexFetchData<TxResponse | null>(api);
}

function issueToken(form: IssueTokenRequest) {
  const api = `${setting.utilHost}/token/issue`;
  return commonApi.flexFetchData<Brc10DeployedTxResponse | null>(
    api,
    'POST',
    form,
  );
}

export const txApi = {
  getTxs,
  getTx,
  issueToken,
};
