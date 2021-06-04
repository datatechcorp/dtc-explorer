import { BlockState } from './block.interface';

export const blockInitialState: BlockState = {
  tickBlock: {
    fetching: false,
    data: [],
    current: 0,
  },
};
