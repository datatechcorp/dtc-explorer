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

export interface Brc10DeployedTxResponse {
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
