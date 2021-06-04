import { Action, createAction } from '../../common';
import { EnterpriseTransactionDto } from './dto/enterprise-transaction';
import { enterpriseWalletApi } from './wallet.api';
import { notification } from '../../../utils/notification';

export const Types = {
  changeFields: 'app.wallet.enterprise.change-fields',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const getMyTransactions = (query: EnterpriseTransactionDto = {}) => async (
  dispatch,
): Promise<boolean> => {
  dispatch(
    changeFields({
      'transaction.isFetching': true,
      'transaction.data': [],
      'transaction.type': query.type,
      'transaction.status': query.status || null,
      'transaction.currency': query.currency || null,
    }),
  );
  const response = await enterpriseWalletApi.getEnterpriseTransactions(query);
  dispatch(
    changeFields({
      'transaction.isFetching': false,
    }),
  );
  if (!response) {
    notification.error('Please check your network');
    return false;
  }

  if (response.code !== 200) {
    notification.error('Something went wrong!');
    return false;
  }

  dispatch(
    changeFields({
      'transaction.data': response.data,
    }),
  );

  return true;
};

export const enterpriseWalletAction = {
  changeFields,
  getMyTransactions,
};
