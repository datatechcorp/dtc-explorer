import { BaseResponse, commonApi } from '../../common';
import { EnterpriseTransactionDto } from './dto/enterprise-transaction';
import { Transaction } from '../../../models/transaction';
import utils from '../../../utils/utils';

function getEnterpriseTransactions(
  query: EnterpriseTransactionDto,
): Promise<BaseResponse<Transaction[]> | null> {
  const api = `/transaction/enterprise${utils.formatQuery(query)}`;
  return commonApi.fetchData<Transaction[]>(api);
}

export const enterpriseWalletApi = {
  getEnterpriseTransactions,
};
