import { Transaction } from '../../models/transaction';
import utils from '../../utils/utils';
import { BaseResponse, commonApi } from '../common';
import { MyTransactionDto } from './dto';

function getMyTransactions(
  query: MyTransactionDto,
): Promise<BaseResponse<Transaction[]> | null> {
  const api = `/transaction/me${utils.formatQuery(query)}`;
  return commonApi.fetchData<BaseResponse<Transaction[]>>(api);
}

export const walletApi = { getMyTransactions };
