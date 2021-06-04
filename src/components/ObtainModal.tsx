import React from 'react';
import { Modal, Form, Input, Select, Button, Checkbox } from 'antd';
import utils from '../utils/utils';
import { setting } from '../config/setting';
import { RootState } from '../redux';
import { walletAction } from '../redux/wallet';
import { connect, ConnectedProps } from 'react-redux';

// const { TextArea } = Input;
const { Option } = Select;

const mapStateToProps = (state: RootState) => ({
  wallet: state.wallet,
  user: state.user,
});
const mapDispatchToProps = {
  changeFields: walletAction.changeFields,
  freeze: walletAction.freeze,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export class Component extends React.Component<ReduxProps, any> {
  constructor(props) {
    super(props);
  }

  toggleObtainModal = () => {
    this.props.changeFields({
      showObtainModal: !this.props.wallet.showObtainModal,
    });
  };

  render(): JSX.Element {
    const {
      user: { balance, frozenBalance, energy, bandwidth, bandwidthUsed },
      wallet: {
        isFetching,
        showObtainModal,
        amountToFreeze,
        amountToFreezeError,
        resourceType,
        confirm,
      },
      changeFields,
      freeze,
    } = this.props;
    return (
      <Modal
        visible={showObtainModal}
        onCancel={this.toggleObtainModal}
        footer={null}
        cancelText={'Close'}
        title="Obtain Resources and DTCORP Power"
        className="freeze-modal-wrap"
      >
        <div className="freeze-tip d-flex justify-content-between">
          <div className="d-flex flex-wrap justify-content-center">
            <span>
              <span>Available BP</span>:
            </span>{' '}
            <span>{utils.formatSeparator(frozenBalance, 6)}</span>{' '}
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            <span>
              <span>Available Energy</span>:
            </span>{' '}
            <span>{utils.formatSeparator(energy, 6)}</span>{' '}
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            <span>
              <span>Available Bandwidth</span>:
            </span>{' '}
            <span>{utils.formatSeparator(bandwidth - bandwidthUsed, 6)}</span>{' '}
          </div>
        </div>
        <Form.Item label="Obtain">
          <Select
            style={{ width: '100%' }}
            defaultValue={resourceType}
            onSelect={(value) => {
              changeFields({ resourceType: value });
            }}
          >
            <Option value="BANDWIDTH">DTCORP Power and Bandwidth</Option>
            <Option value="ENERGY">DTCORP Power and Energy</Option>
          </Select>
        </Form.Item>
        {amountToFreezeError}
        <Form.Item
          label={`Amount(${setting.symbol})`}
          validateStatus={amountToFreezeError ? 'error' : 'success'}
          help={amountToFreezeError}
        >
          <Input
            placeholder="Amount"
            value={amountToFreeze}
            onChange={(e) => {
              changeFields({ amountToFreeze: e.target.value });
            }}
            suffix={
              <Button
                type="link"
                size="small"
                style={{ borderColor: 'transparent' }}
                onClick={(e) => {
                  e.preventDefault();
                  changeFields({ amountToFreeze: balance });
                }}
              >
                MAX
              </Button>
            }
          />
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={confirm}
            onChange={() => {
              changeFields({ confirm: !confirm });
            }}
          >
            I confirm to freeze 0 {setting.symbol} at least 72 hours
          </Checkbox>
        </Form.Item>
        <div className="text-center">
          <Button
            disabled={!confirm || !amountToFreeze}
            className="mt-15"
            type="primary"
            loading={isFetching}
            onClick={() => freeze()}
          >
            Freeze
          </Button>
        </div>
      </Modal>
    );
  }
}

export const ObtainModal = connector(Component);
