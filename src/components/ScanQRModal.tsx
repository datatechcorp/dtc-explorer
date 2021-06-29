import React from 'react';
import { Modal } from 'antd';
import QrReader from 'react-qr-reader';
import utils from '../utils/utils';

type PropsType = {
  onScan: (text: string) => any;
  visible: boolean;
  onClose: () => any;
};

export class ScanQrModal extends React.Component<PropsType, any> {
  constructor(props) {
    super(props);
    this.state = {
      hasCamera: true,
    };
  }

  componentDidMount(): void {
    utils.detectWebcam((hasWebcam) => {
      if (!hasWebcam) {
        this.setState({ hasCamera: false });
      }
    });
  }

  handleScan = (data): void => {
    if (typeof data === 'string') {
      this.props.onScan(data);
    }
  };

  handleError = (err): void => {
    console.error(err);
    this.setState({ hasCamera: false });
  };

  render(): JSX.Element {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onClose}
        footer={null}
        cancelText={'Close'}
      >
        {this.props.visible && (
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100%', maxWidth: '30em' }}
          />
        )}

        {!this.state.hasCamera && (
          <div className="mt-15">
            <b style={{ color: 'red' }}>{`Can't access camera!`}</b>
            <ul style={{ textAlign: 'left' }}>
              <li>
                If you are using Iphone or Ipad, please browser DataTechCorp via{' '}
                <b>Safari</b>.
              </li>
              <li>
                If you are using Android or PC/Mac, please make sure that
                DataTechCorp was granted camera permission:
                <img
                  style={{ width: '100%', maxWidth: '500px' }}
                  src={require('../assets/images/check-camera.png')}
                />
              </li>
            </ul>
          </div>
        )}
      </Modal>
    );
  }
}
