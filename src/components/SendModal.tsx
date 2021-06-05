import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import utils from '../utils/utils';
import { setting } from '../config/setting';
import { RootState } from '../redux';
import { walletAction } from '../redux/wallet';
import { connect, ConnectedProps } from 'react-redux';

const { TextArea } = Input;
const { Option } = Select;

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  wallet: state.wallet,
});
const mapDispatchToProps = {
  send: walletAction.send,
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

  render(): JSX.Element {
    const {
      user: { balance, asset, drc10Token, drc20Token },
      wallet: {
        amount,
        token,
        receiver,
        amountError,
        receiverError,
        isFetching,
        showSendModal,
      },
      changeFields,
    } = this.props;
    return (
      <Modal
        visible={showSendModal}
        onCancel={this.toggleSendModal}
        footer={null}
        cancelText={'Close'}
        title="Send"
        className="freeze-modal-wrap"
      >
        <Form.Item
          label="To"
          validateStatus={receiverError ? 'error' : 'success'}
          help={receiverError}
        >
          <Input
            placeholder="Address"
            value={receiver}
            onChange={(e) => {
              changeFields({ receiver: e.target.value });
            }}
          />
          Demo: DMQ1ute2mBr1381BphZbs8RWzWqqBy1KSp
        </Form.Item>
        <Form.Item label="Token">
          <Select
            style={{ width: '100%' }}
            defaultValue={token}
            onSelect={(val: string) => changeFields({ token: val })}
          >
            <Option value="dtc">
              {setting.symbol}({utils.formatSeparator(balance, 6)} available)
            </Option>
            {drc10Token.map((el) => {
              const { symbol, name, balance } = el;
              return (
                <Option key={name} value={name}>
                  {symbol}({balance} available)
                </Option>
              );
            })}
            {drc20Token.map((el) => {
              const { symbol, name, balance } = el;
              return (
                <Option key={name} value={name}>
                  {symbol}({balance} available)
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Amount"
          validateStatus={amountError ? 'error' : 'success'}
          help={amountError}
        >
          <Input
            placeholder="Amount"
            value={amount}
            onChange={(e) => {
              changeFields({ amount: e.target.value });
            }}
            suffix={
              <Button
                type="link"
                size="small"
                style={{ borderColor: 'transparent' }}
                className="text-dark"
                onClick={(e) => {
                  let max = balance;
                  if (token !== 'trx') {
                    asset.some((el) => {
                      if (el.key === token) {
                        max = el.value;
                        return true;
                      }
                    });
                  }
                  e.preventDefault();
                  changeFields({ amount: max });
                }}
              >
                MAX
              </Button>
            }
          />
        </Form.Item>
        <div className="text-center">
          <Button
            className="mt-15"
            type="primary"
            loading={isFetching}
            onClick={() => this.props.send()}
            disabled={!(amount && receiver)}
          >
            Send
          </Button>
        </div>
      </Modal>
    );
  }
}

export const SendModal = connector(Component);
