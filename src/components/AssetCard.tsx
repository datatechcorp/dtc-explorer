import React from 'react';
import { Card } from 'antd';
import utils from '../utils/utils';
import { SendModal, ReceiveModal } from '../components';
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

  toggleSendModal = () => {
    this.props.changeFields({
      showSendModal: !this.props.wallet.showSendModal,
    });
  };

  toggleReceiveModal = () => {
    this.props.changeFields({
      showReceiveModal: !this.props.wallet.showReceiveModal,
    });
  };

  toggleObtainModal = () => {
    this.props.changeFields({
      showObtainModal: !this.props.wallet.showObtainModal,
    });
  };

  render(): JSX.Element {
    const {
      user: { balance },
    } = this.props;
    return (
      <>
        <Card bordered={true} className="account-card">
          <p className="title">
            <span>Total Assets</span>
          </p>
          <p className="total-trx">
            <span>
              {utils.formatSeparator(balance, 6)} {setting.symbol}
            </span>
          </p>
          <p className="usd">
            <span>
              ≈
              <span>
                {utils.formatSeparator(balance * setting.priceInUsd, 6)}{' '}
              </span>{' '}
              USD
            </span>
          </p>
          <p className="operate">
            <span
              onClick={this.toggleSendModal}
              className="btn btn-default btn-sm text-capitalize"
            >
              <span>Send</span>
            </span>
            <span
              onClick={this.toggleReceiveModal}
              className="btn btn-default btn-sm text-capitalize"
            >
              <span>Receive</span>
            </span>
          </p>
        </Card>
        <SendModal />
        <ReceiveModal />
      </>
    );
  }
}

export const AssetCard = connector(Component);
