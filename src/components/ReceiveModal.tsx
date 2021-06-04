import React from 'react';
import { Modal, Row, Col } from 'antd';
import QRCode from 'qrcode.react';
import { CopyableText } from '../components';
import { walletAction } from '../redux/wallet';
import { RootState } from '../redux';
import { connect, ConnectedProps } from 'react-redux';

// const { TextArea } = Input;
// const { Option } = Select;

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  wallet: state.wallet,
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

  toggleReceiveModal = () => {
    this.props.changeFields({
      showReceiveModal: !this.props.wallet.showReceiveModal,
    });
  };

  render(): JSX.Element {
    const {
      user: { walletAddress },
      wallet: { showReceiveModal },
    } = this.props;
    return (
      <Modal
        visible={showReceiveModal}
        onCancel={this.toggleReceiveModal}
        footer={null}
        cancelText={'Close'}
        title="Account QR Code"
        className="freeze-modal-wrap"
      >
        <Row type="flex" justify="center">
          <Col span={24} className="text-center">
            <QRCode value={walletAddress} size={200} level="H" />
          </Col>
          <Col span={24}>
            <CopyableText label="Wallet Address" value={walletAddress} />
          </Col>
        </Row>
      </Modal>
    );
  }
}

export const ReceiveModal = connector(Component);
