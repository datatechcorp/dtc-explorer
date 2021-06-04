import React from 'react';
import { Form, Icon, Input, Col, Row } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { LoadableButton } from '../../components';
import { authAction } from '../../redux/auth';
import stringParser from 'query-string';

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
const mapDispatchToProps = {
  changeFields: authAction.changeFields,
  connect: authAction.connect,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class ConnectScreen extends React.Component<PropsFromRedux, {}> {
  constructor(props) {
    super(props);

    const search = props.location.search;
    let url: any = '';
    if (search) {
      const query = stringParser.parse(search);
      if (query && query.returnUrl) {
        url = query.returnUrl as string;
      }
    }
    props.changeFields({
      'connectForm.key': '',
      'connectForm.usernameOrEmailError': null,
      returnUrl: url,
    });
  }

  handleSubmit: (e) => void = (e) => {
    e.preventDefault();
    this.props.connect(this.props.auth.connectForm.key);
  };
  changeField = (key: string, value: any): void => {
    this.props.changeFields({
      [`connectForm.${key}`]: value,
      [`connectForm.${key}Error`]: null,
    });
  };
  render(): JSX.Element {
    const {
      connectForm: { key, keyError },
    } = this.props.auth;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row gutter={[16, 16]} type="flex" justify="center">
          <Col span={16} xs={24} md={16}>
            <Form.Item
              className="mb-0"
              validateStatus={keyError ? 'error' : 'success'}
              help={keyError}
            >
              <Input
                value={key}
                onChange={(e): void => this.changeField('key', e.target.value)}
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="text"
                placeholder="Enter private key"
              />
            </Form.Item>
          </Col>
          <Col span={16} xs={24} md={16}>
            <Form.Item>
              <LoadableButton
                type="primary"
                htmlType="submit"
                isFetching={this.props.auth.isFetching}
                className="login-form-button"
              >
                Connect
              </LoadableButton>
            </Form.Item>
          </Col>
          <Col span={24}>
            <p style={{ color: '#333' }}>
              Demo Private Key.
              f5ca38f748a1d6eaf726b8a42fb575c3c71f1864a8143301782de13da2d9202b
            </p>
          </Col>
        </Row>
      </Form>
    );
  }
}

export const Connect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectScreen);
