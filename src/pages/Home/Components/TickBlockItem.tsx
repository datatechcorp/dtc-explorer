import React from 'react';
import { setting } from '../../../config/setting';
import { Block } from '../../../redux/block';

interface Props {
  data: Block;
}

const TickBlockItem: React.FC<Props> = ({ data }) => {
  const { blockNumber, transactionSize, triggerName, timeStamp } = data;
  return (
    <>
      <div className="d-flex">
        <div className="list-body-left">
          <p>
            Blocks <span className="text-red">{blockNumber}</span>
          </p>
          <p className="text-small">
            Includes <span className="text-red">{transactionSize} Txs</span>
          </p>
          <p className="text-small">
            Block Reward: {setting.blockReward} {setting.symbol}
          </p>
        </div>
        <div className="list-body-right">
          <p>
            Produced by: <span className="text-red">{triggerName}</span>
          </p>
          <p className="time text-small">
            {Math.floor(Math.abs((Date.now() - timeStamp) / 1000))}secs ago
          </p>
        </div>
      </div>
    </>
  );
};

export default TickBlockItem;
