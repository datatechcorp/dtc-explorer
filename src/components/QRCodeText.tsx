import React from 'react';
import { Modal, Button, Tooltip } from 'antd';
import QRCode from 'qrcode.react';
import { CopyableText } from './CopyableText';

type PropsType = {
  fontSize?: string | number;
  class?: string;
  text?: any;
  icon?: string;
  address: any;
};

export class QRCodeText extends React.Component<PropsType, any> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render(): JSX.Element {
    return (
      <div>
        <Tooltip title="Show QR Code">
          <Button
            className={this.props.class}
            style={{
              color: 'rgba(0,0,0,.45)',
              fontSize: this.props.fontSize,
              borderColor: 'transparent',
            }}
            onClick={this.showModal}
            icon={this.props.icon}
          >
            {this.props.text}
          </Button>
        </Tooltip>
        <Modal
          title="Account QR Code"
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <p className="text-dark">Wallet Address</p>
          <div
            style={{
              background: '#F3F3F3',
              padding: '4px 8px',
              marginBottom: '12px',
            }}
          >
            <span className="text-dark">{this.props.address}</span>
            <span className="ml-2">
              <CopyableText
                class="menu-copy ant-btn-link text-dark"
                value={this.props.address}
              />
            </span>
          </div>
          <div className="text-center">
            <QRCode value={this.props.address} size={200} level="H" />
          </div>
        </Modal>
      </div>
    );
  }
}
