import React from 'react';
import { Card, Tooltip, Progress } from 'antd';
import utils from '../utils/utils';
import iconQuestion from '../assets/images/icons/question.svg';
import { routeName } from '../config/route-name';
import { Link } from 'react-router-dom';
import { setting } from '../config/setting';
import { RootState } from '../redux';
import { walletAction } from '../redux/wallet';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  wallet: state.wallet,
  user: state.user,
});
const mapDispatchToProps = {
  changeFields: walletAction.changeFields,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

class Component extends React.Component<ReduxProps, any> {
  constructor(props) {
    super(props);
  }

  toggleObtainModal = () => {
    this.props.changeFields({
      showObtainModal: !this.props.wallet.showObtainModal,
    });
  };

  render(): JSX.Element {
    const { reward, frozenBalance } = this.props.user;
    return (
      <>
        <Card bordered={true} className="account-card">
          <p className="title">
            <span>DTCORP Power</span>
          </p>
          <p className="voteReward">
            <span>Unwithdrawn Rewards：</span>
            <span>
              {utils.formatSeparator(reward, 6)} {setting.symbol}
            </span>
          </p>
          <section className="voteWrapper">
            <div className="d-flex ant-row-flex-space-between">
              <div className="num">
                {frozenBalance}
                <span className="limit">/{frozenBalance}</span>
              </div>
              <span className="tips">
                <span>DataTechCorp Power</span>
                <span className="ml-1">
                  <Tooltip title="DTCORP Power (BP) is used for voting for DTCORP SRs. Users can gain BP through freezing DTC.">
                    <img src={iconQuestion} alt="icon" />
                  </Tooltip>
                </span>
              </span>
            </div>
            <Progress
              strokeColor="rgb(69,191,85)"
              percent={parseFloat(
                utils.formatSeparator(
                  ((frozenBalance - 0) * 100) / frozenBalance,
                  2,
                ),
              )}
              status="active"
            />
          </section>
          <p className="operate">
            <span
              onClick={this.toggleObtainModal}
              className="btn btn-default btn-sm text-capitalize"
            >
              <span>Get Votes</span>
            </span>
            <span className="btn btn-default btn-sm text-capitalize">
              <span>Votes</span>
            </span>
            <span className="btn btn-default btn-sm text-capitalize">
              <span>Withdraw</span>
            </span>
          </p>
        </Card>
      </>
    );
  }
}

export const VoteCard = connector(Component);
