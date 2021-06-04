import React from 'react';
import { Modal, Button } from 'antd';

type PropsType = {
  fontSize?: string | number;
  class?: string;
  text?: any;
  icon?: string;
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

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
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
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}
