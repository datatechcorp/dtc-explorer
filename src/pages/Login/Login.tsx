import React from 'react';
import { Form, Icon, Input, Col, Row } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { push } from 'connected-react-router';
import { routeName } from '../../config/route-name';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux';
import { LoadableButton } from '../../components';
import { authAction } from '../../redux/auth';
import stringParser from 'query-string';

const mapStateToProps = (state: RootState): any => ({
  auth: state.auth,
});
const mapDispatchToProps = {
  changeFields: authAction.changeFields,
  goToPage: push,
  login: authAction.login,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class LoginScreen extends React.Component<PropsFromRedux, {}> {
  constructor(props) {
    super(props);

    const search = props.location.search;
    let url: any = null;
    if (search) {
      const query = stringParser.parse(search);
      if (query && query.returnUrl) {
        url = query.returnUrl as string;
      }
    }
    props.changeFields({
      'authForm.usernameOrEmail': '',
      'authForm.usernameOrEmailError': null,

      'authForm.password': '',
      'authForm.passwordError': null,

      'authForm.code': '',
      'authForm.codeError': null,

      'authForm.requiredTwoFa': false,
      returnUrl: url,
    });
  }

  handleSubmit: (e) => void = (e) => {
    e.preventDefault();
    const form = this.props.auth.authForm;
    this.props.login(form);
  };

  changeField = (key: string, value: any): void => {
    this.props.changeFields({
      [`authForm.${key}`]: value,
      [`authForm.${key}Error`]: undefined,
    });
  };

  render(): JSX.Element {
    const { authForm } = this.props.auth;
    if (authForm.requiredTwoFa) {
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Row gutter={[16, 16]} type="flex" justify="center">
            <Col className="text-center">Enter 2FA Code</Col>
            <Col span={16} xs={24} md={16}>
              <Form.Item
                className="mb-0"
                validateStatus={authForm.tokenError ? 'error' : 'success'}
                help={authForm.tokenError}
              >
                <Input
                  value={authForm.token}
                  onChange={(e): void =>
                    this.changeField('token', e.target.value)
                  }
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="text"
                  placeholder="Enter code here"
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
                  Login
                </LoadableButton>

                <a
                  style={{ color: '#e5371b' }}
                  href="!#"
                  onClick={(e): void => {
                    e.preventDefault();
                    this.changeField('requiredTwoFa', false);
                  }}
                >
                  Go back
                </a>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      );
    }

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row gutter={[16, 16]} type="flex" justify="center">
          <Col span={16} xs={24} md={16}>
            <Form.Item
              className="mb-0"
              validateStatus={
                authForm.usernameOrEmailError ? 'error' : 'success'
              }
              help={authForm.usernameOrEmailError}
            >
              <Input
                value={authForm.usernameOrEmail}
                onChange={(e): void =>
                  this.changeField('usernameOrEmail', e.target.value)
                }
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="text"
                placeholder="Username or Email"
              />
            </Form.Item>
          </Col>
          <Col span={16} xs={24} md={16}>
            <Form.Item
              className="mb-0"
              validateStatus={authForm.passwordError ? 'error' : 'success'}
              help={authForm.passwordError}
            >
              <Input
                value={authForm.password}
                onChange={(e): void =>
                  this.changeField('password', e.target.value)
                }
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            </Form.Item>
          </Col>
          <Col span={16} xs={24} md={16}>
            <Form.Item>
              {/* <Checkbox>Remember me</Checkbox> */}
              <Link
                to={routeName.forgotPassword}
                className="login-form-forgot"
                style={{ color: '#e5371b' }}
              >
                Forgot password
              </Link>
              <LoadableButton
                type="primary"
                htmlType="submit"
                isFetching={this.props.auth.isFetching}
                className="login-form-button"
              >
                Login
              </LoadableButton>
              Or{' '}
              <Link style={{ color: '#e5371b' }} to={routeName.register}>
                register now!
              </Link>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
