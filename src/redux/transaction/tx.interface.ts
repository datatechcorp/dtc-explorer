import { setting } from '../../config/setting';

export interface Tx {
  transactionId: string;
  blockHash: string;
  blockNumber: number;
  energyUsage: number;
  energyFee: number;
  originEnergyUsage: number;
  energyUsageTotal: number;
  netUsage: number;
  netFee: number;
  result: string;
  contractAddress: string | null;
  contractType: string;
  feeLimit: number;
  contractCallValue: number;
  timeStamp: number;
  triggerName: string;
  internalTrananctionList: any;
  fromAddress: string;
  toAddress: string;
  assetName: string;
  assetAmount: number;
  contractResult: any;
  latestSolidifiedBlockNumber: number;
  data: string;
}

export interface TickTx {
  fetching: boolean;
  data: Tx[];
}

export interface TokenBase {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
}

export interface Drc10Token extends TokenBase {
  balance: string;
  id: string;
}

export interface Drc20Token extends TokenBase {
  contractAddress: string;
  balance: string;
}

export type TokenType = typeof setting.tokenTypes[number];

export interface IssueTokenForm extends TokenBase {
  agree: boolean;
  tokenType: TokenType;
  description: string;
  url: string;
  ratio: number;
}

export interface IssueTokenRequest extends TokenBase {
  address: string;
}

export interface TxState {
  tickTx: TickTx;
  mine: Tx[];
  fetching: boolean;
  issueTokenForm: IssueTokenForm;
  recordContrForm: RecordContrForm;
}

export interface TxsResponse {
  total: number;
  data: Tx[];
}

export interface TxResponse {
  transaction: Tx;
}

interface ContractItem {
  parameter: {
    value: {
      start_time: number;
      trx_num: number;
      total_supply: number;
      precision: number;
      num: number;
      name: string; // hex
      end_time: number;
      description: string; // hex
      owner_address: string; // hex
      abbr: string; // hex
      url: string; // hex
    };
  };
}

export interface Drc10DeployedTxResponse {
  result: boolean;
  txid: string;
  transaction: {
    visible: boolean;
    txID: string;
    raw_data: {
      contract: ContractItem[];
      expiration: number;
      timestamp: number;
    };
  };
}

export interface SmLinks {
  platforms: string[];
  entries: Record<string, string[]>;
}

export interface RecordContrBase {
  contrType: string;
  contrAddress: string;
}

export interface RecordContrParams {
  tknDescriptions: string;
  tknLogo: string;
  oflWebsite: string;
  email: string;
}

export interface RecordContrOptional {
  github: string;
  whitepaper: string;
  links: SmLinks;
}

export interface RecordContrForm
  extends RecordContrBase,
    RecordContrParams,
    RecordContrOptional {
  contrAddressErr: string;
  tknDescriptionsErr: string;
  tknLogoErr: string;
  oflWebsiteErr: string;
  emailErr: string;
  signature: string;
  hasErrors: boolean;
  isDone: boolean;
}

export interface RecordContrRequest
  extends RecordContrBase,
    RecordContrParams,
    Partial<RecordContrOptional> {
  signature: string;
}

export interface RecordContr
  extends RecordContrBase,
    RecordContrParams,
    RecordContrOptional {
  id: string;
  createdAt: string;
}
