import { TxState } from './tx.interface';

export const txInitialState: TxState = {
  tickTx: {
    fetching: false,
    data: [],
  },
  mine: [],
  fetching: false,
  issueTokenForm: {
    agree: true,
    name: '',
    symbol: '',
    decimals: 6,
    totalSupply: '1000',
    tokenType: 'DRC20',
    description: '',
    ratio: 1,
    url: 'https://token.io',
  },
  recordContrForm: {
    contrAddress: '',
    contrAddressErr: '',
    contrType: 'drc20',
    email: '',
    emailErr: '',
    oflWebsite: '',
    oflWebsiteErr: '',
    tknDescriptions: '',
    tknDescriptionsErr: '',
    tknLogo: '',
    tknLogoErr: '',
    github: '',
    links: {
      platforms: [],
      entries: {},
    },
    whitepaper: '',
    signature: '',
    hasErrors: false,
    isDone: false,
  },
};
