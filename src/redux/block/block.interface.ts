export interface Block {
  blockNumber: number;
  blockHash: string;
  transactionSize: number;
  timeStamp: number;
  triggerName: string;
}

export interface TickBlock {
  fetching: boolean;
  data: Block[];
  current: number;
}

export interface BlockState {
  tickBlock: TickBlock;
}

export interface BlocksResponse {
  total: number;
  data: Block[];
}
