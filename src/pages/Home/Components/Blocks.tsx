import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux';
import iconBlock from '../../../assets/images/icons/block.svg';
import { Block, blockAction } from '../../../redux/block';
import TickBlockItem from './TickBlockItem';
import { setting } from '../../../config/setting';
import { Skeleton } from 'antd';

const mapStateToProps = (state: RootState) => ({
  tickBlock: state.block.tickBlock,
});
const mapDispatchToProps = {
  getBlocks: blockAction.getBlocks,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Screen extends React.Component<PropsFromRedux> {
  interval: any;
  componentDidMount(): void {
    this.interval = setInterval(() => {
      const { current } = this.props.tickBlock;
      this.props.getBlocks(
        { block: current, limit: setting.maxTickBlocks },
        'tickBlock',
      );
    }, 5000);
  }
  componentWillUnmount(): void {
    clearInterval(this.interval);
  }
  render(): JSX.Element {
    const { data } = this.props.tickBlock;
    console.log('data :>> ', data);
    return (
      <div className="home-blocks card">
        <div className="card-header d-flex">
          <img src={iconBlock} alt="img" className="rotate-icon" />
          <div className="ml-2 title">
            <span>Blocks</span>
          </div>
          <a
            className="ml-auto more mt-1"
            href="!#"
            onClick={(e) => e.preventDefault()}
          >
            <span>More</span> &gt;
          </a>
        </div>
        {data.length === 0 ? (
          <div className="card-body">
            <Skeleton active />
          </div>
        ) : (
          <div className="scrollbar-container">
            <ul className="list-group list-group-flush">
              {(data || []).map((block: Block) => {
                return (
                  <li
                    className="list-group-item blocks-body"
                    key={block.blockHash}
                  >
                    <TickBlockItem data={block} />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export const Blocks = connector(Screen);
