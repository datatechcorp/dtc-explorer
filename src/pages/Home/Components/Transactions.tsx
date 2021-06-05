import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import iconTransactions from '../../../assets/images/icons/transactions.svg';
import { setting } from '../../../config/setting';
import { sdk } from '../../../config/utils';
import { RootState } from '../../../redux';
import { txAction } from '../../../redux/transaction';
import { Link } from 'react-router-dom';
import { routeName } from '../../../config/route-name';
import { Skeleton } from 'antd';

const mapStateToProps = (state: RootState) => ({
  tickTx: state.transaction.tickTx,
});
const mapDispatchToProps = {
  getTxs: txAction.getTxs,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Screen extends React.Component<PropsFromRedux> {
  interval: any;
  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.getTxs({ limit: setting.maxTickTxs }, 'tickTx');
    }, 3000);
  }
  componentWillUnmount(): void {
    clearInterval(this.interval);
  }
  render(): JSX.Element {
    const { data } = this.props.tickTx;
    return (
      <div className="home-transactions card">
        <div className="card-header d-flex">
          <img src={iconTransactions} alt="img" className="rotate-icon" />
          <div className="ml-2 title">
            <span>Transactions</span>
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
              {(data || []).map((tx) => {
                const {
                  transactionId,
                  fromAddress,
                  toAddress,
                  assetName,
                  assetAmount,
                  timeStamp,
                } = tx;
                const symbol = setting.symbol;
                return (
                  <li
                    className="list-group-item blocks-body"
                    key={transactionId}
                  >
                    <div className="d-flex">
                      <div className="list-body-left">
                        <Link
                          to={routeName.transaction}
                          className="text-red ellipsis_box w-300"
                        >
                          <div className="ellipsis_box_start">
                            {transactionId}
                          </div>
                          <div className="ellipsis_box_end">
                            {transactionId.slice(-5)}
                          </div>
                        </Link>
                        <div className="text-small">
                          Transaction type: Transfer {symbol}
                        </div>

                        <div className="d-flex justify-content-start">
                          <div className="text-small d-flex">
                            From:
                            <div className="text-red ellipsis_box w-125">
                              <div className="ellipsis_box_start">
                                {fromAddress}
                              </div>
                              <div className="ellipsis_box_end">
                                {(fromAddress || '').slice(-5)}
                              </div>
                            </div>
                          </div>
                          <div className="ml-5 text-small d-flex">
                            To:
                            <div className="text-red ellipsis_box w-125">
                              <div className="ellipsis_box_start">
                                {toAddress}
                              </div>
                              <div className="ellipsis_box_end">
                                {(toAddress || '').slice(-5)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="list-body-right">
                        <p>
                          {sdk.ins.fromSun(assetAmount)} {symbol}
                        </p>
                        <p className="time text-small">
                          {Math.floor(
                            Math.abs((Date.now() - timeStamp) / 1000),
                          )}
                          secs ago
                        </p>
                      </div>
                    </div>
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

export const Transactions = connector(Screen);
