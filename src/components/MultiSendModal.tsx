import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import utils from '../utils/utils';
import { setting } from '../config/setting';

const { TextArea } = Input;
const { Option, OptGroup } = Select;

type PropsType = {
  visible: boolean;
  onClose: () => any;
};

export class MultiSendModal extends React.Component<PropsType, any> {
  constructor(props) {
    super(props);
    this.state = {
      // hasSend: true,
    };
  }

  render(): JSX.Element {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onClose}
        footer={null}
        cancelText={'Close'}
        title="Multi Send"
        className="freeze-modal-wrap"
        style={{ top: 20 }}
      >
        <Form.Item label="From">
          <Input
            placeholder="address"
            value="TSQNwvocG78iijtuwmy566KKgffbTJptpK"
          />
        </Form.Item>
        <Form.Item label="Access">
          <Select style={{ width: '100%' }} defaultValue="owner">
            <OptGroup label="Owner access group">
              <Option value="owner">Owner</Option>
            </OptGroup>
            <OptGroup label="Active access group">
              <Option value="active">Active</Option>
            </OptGroup>
          </Select>
        </Form.Item>
        <Form.Item label="Expire Time(H)">
          <Input placeholder="expire time" value={24} />
        </Form.Item>
        <Form.Item label="To">
          <Input value="" />
        </Form.Item>
        <Form.Item label="Token">
          <Select style={{ width: '100%' }} defaultValue="trx">
            <Option value="trc">TRC20</Option>
            <Option value="trx">
              {setting.symbol}({utils.formatSeparator(1231233.4123, 6)}{' '}
              available)
            </Option>
          </Select>
        </Form.Item>
        <Form.Item label="Amount">
          <Input
            placeholder="Amount"
            suffix={
              <Button
                type="link"
                size="small"
                style={{ borderColor: 'transparent' }}
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
            // loading={wallet.transfer.isFetching}
            // onClick={(): void => this.transfer()}
          >
            Send
          </Button>
        </div>
      </Modal>
    );
  }
}
