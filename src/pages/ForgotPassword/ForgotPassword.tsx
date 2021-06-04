import React from 'react';
import { Form, Icon, Input, Col, Row } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { authAction } from '../../redux/auth';
import { push } from 'connected-react-router';
import { routeName } from '../../config/route-name';
import { RootState } from '../../redux';
import { LoadableButton } from '../../components';

const mapStateToProps = (state: RootState): any => ({
  auth: state.auth,
  user: state.user,
});
const mapDispatchToProps = {
  changeFields: authAction.changeFields,
  sendEmail: authAction.sendForgotPasswordEmail,
  goToPage: push,
  logout: authAction.logout,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
class Screen extends React.Component<PropsFromRedux, {}> {
  constructor(props) {
    super(props);
    props.changeFields({
      'authForm.email': '',
      'authForm.emailError': null,

      'authForm.phone': '',
      'authForm.phoneError': null,
    });
  }

  handleSubmit = (e): void => {
    e.preventDefault();

    const { authForm } = this.props.auth;
    this.props.sendEmail(authForm);
  };

  changeField = (key: string, value: any): void => {
    this.props.changeFields({
      [`authForm.${key}`]: value,
      [`authForm.${key}Error`]: undefined,
    });
  };

  goToLogin = (): void => {
    this.props.goToPage(routeName.login);
  };

  render(): JSX.Element {
    const { authForm } = this.props.auth;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row gutter={[16, 16]} type="flex" justify="center">
          <Col span={16} md={16} xs={24}>
            <Form.Item
              className="mb-0"
              validateStatus={authForm.emailError ? 'error' : 'success'}
              help={authForm.emailError}
            >
              <Input
                value={authForm.email}
                onChange={(e): void =>
                  this.changeField('email', e.target.value)
                }
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="text"
                placeholder="Email"
              />
            </Form.Item>
          </Col>
          <Col span={16} md={16} xs={24}>
            <Form.Item>
              <LoadableButton
                type="primary"
                htmlType="submit"
                isFetching={this.props.auth.isFetching}
                className="login-form-button"
              >
                Send email
              </LoadableButton>
              Or <a onClick={this.goToLogin}>Login now!</a>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export const ForgotPassword = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen);
