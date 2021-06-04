import { WalletState, CoinServiceActionType } from './wallet.interface';
import moment from 'moment';

export const walletInitialState: WalletState = {
  transaction: {
    isFetching: false,
    type: null,
    status: null,
    currency: null,
    data: [],
    statistic: [],
  },
  withdraw: {
    isFetching: false,
    amount: undefined,
    amountError: null,
    address: '',
    addressError: null,
    wallet: null,
  },
  transfer: {
    isFetching: false,
    amount: 0,
    amountError: null,
    username_or_email: '',
    receivedUser: null,
    canTransfer: false,
    wallet: null,
  },
  investment: {
    isFetching: false,
    data: [],
    maxInvestment: null,
  },
  subscription: {
    mySubscriptions: [],
    currentSubscription: null,
    isFetching: false,
    isGot: false,
  },
  coinService: {
    isFetching: false,
    actionType: CoinServiceActionType.Buy,
    address: '',
    amount: 10,
  },
  lending: {
    isFetching: false,
    form: {
      amountError: null,
      amount_usd: 50,
      wallet: null,
    },
    data: [],
  },

  swap: {
    isFetching: false,
    amount: 0,
    amountError: null,
  },
  childrenStatistic: {
    isFetching: false,
    from: moment(new Date()).startOf('month').toDate(),
    to: moment(new Date()).endOf('month').toDate(),
    totalLendingUsdt: 0,
    totalSwapAmas: 0,
    totalApoint: 0,
  },
  paymentCode: {
    info: null,
    isFetching: false,
    wallet: null,
  },
  isGotWallet: false,
  walletByCoin: {}, //key is coin id, value is Wallet Type
  coinById: {},
  isGotCoin: false,
  //
  isFetching: false,
  showSendModal: false,
  showReceiveModal: false,
  showObtainModal: false,
  amount: 0,
  token: 'dtc',
  receiver: '',
  amountError: null,
  receiverError: null,
  amountToFreeze: 0,
  amountToFreezeError: null,
  resourceType: 'BANDWIDTH',
  confirm: false,
  duration: 3,
};
