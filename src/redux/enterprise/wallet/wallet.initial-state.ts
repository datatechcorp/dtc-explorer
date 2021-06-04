import { EnterpriseWalletState } from './wallet.interface';

export const walletInitialState: EnterpriseWalletState = {
  transaction: {
    isFetching: false,
    type: null,
    status: null,
    currency: null,
    data: [],
  },
};
