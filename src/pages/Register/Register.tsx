import React from 'react';
import { Form, Icon, Input, Col, Row, Select } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { authAction, AuthForm } from '../../redux/auth';
import { push } from 'connected-react-router';
import { routeName } from '../../config/route-name';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux';
import { LoadableButton } from '../../components';
import queryParser from 'query-string';
import _ from 'lodash';

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
const mapDispatchToProps = {
  changeFields: authAction.changeFields,
  register: authAction.registerUser,
  goToPage: push,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Screen extends React.Component<PropsFromRedux, {}> {
  refUser;
  constructor(props) {
    super(props);

    const query: any = queryParser.parse(props.history.location.search);
    if (query.user) {
      this.refUser = query.user;
    }
    props.changeFields({
      'authForm.usernameError': null,

      'authForm.passwordError': null,

      'authForm.first_nameError': null,

      'authForm.last_nameError': null,

      'authForm.emailError': null,

      'authForm.phoneError': null,

      'authForm.confirmPasswordError': null,
    });
    if (props.address.countries.length === 0) {
      props.getCountries();
    }
  }

  handleSubmit = (e): void => {
    // e.preventDefault();
    // const { authForm } = this.props.auth;
    // const data = { ...authForm };
    // if (data.invitation_code === '') {
    //   delete data.invitation_code;
    // }
    // this.props.register(data);
  };

  changeField = (key: string, value: any): void => {
    this.props.changeFields({
      [`authForm.${key}`]: value,
      [`authForm.${key}Error`]: undefined,
    });
  };

  changeRefUser = (username: string): void => {
    this.changeField('invitation_code', username);
  };

  render(): JSX.Element {
    const { authForm } = this.props.auth as { authForm: AuthForm };

    let invitationStatus;
    let invitationHelp;
    if (authForm.isFetchingInvitationInfo) {
      invitationStatus = 'validating';
    } else if (authForm.invitation_codeError) {
      invitationStatus = 'error';
      invitationHelp = authForm.invitation_codeError;
    } else if (authForm.invitationInfo) {
      invitationStatus = 'success';
      invitationHelp = `${authForm.invitationInfo.first_name} ${authForm.invitationInfo.last_name}`;
    }
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row type="flex" justify="center">
          <Col span={16} md={16} xs={24}>
            <Row gutter={[16, 16]}>
              <Col sm={24} md={12}>
                <Form.Item
                  className="mb-0"
                  validateStatus={
                    authForm.first_nameError ? 'error' : 'success'
                  }
                  help={authForm.first_nameError}
                >
                  <Input
                    value={authForm.first_name}
                    onChange={(e): void =>
                      this.changeField('first_name', e.target.value)
                    }
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="First name"
                  />
                </Form.Item>
              </Col>
              <Col sm={24} md={12}>
                <Form.Item
                  className="mb-0"
                  validateStatus={authForm.last_nameError ? 'error' : 'success'}
                  help={authForm.last_nameError}
                >
                  <Input
                    value={authForm.last_name}
                    onChange={(e): void =>
                      this.changeField('last_name', e.target.value)
                    }
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Last name"
                  />
                </Form.Item>
              </Col>
              <Col sm={24} md={12}>
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
                      <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="text"
                    placeholder="Email"
                  />
                </Form.Item>
              </Col>
              <Col sm={24} md={12}>
                <Form.Item
                  className="mb-0"
                  validateStatus={authForm.phoneError ? 'error' : 'success'}
                  help={authForm.phoneError}
                >
                  <Input
                    value={authForm.phone}
                    onChange={(e): void =>
                      this.changeField('phone', e.target.value)
                    }
                    // prefix={
                    //   <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    // }
                    addonBefore={
                      authForm.country.phone ? '+' + authForm.country.phone : ''
                    }
                    type="text"
                    placeholder="Phone"
                  />
                </Form.Item>
              </Col>
              <Col sm={24}>
                <Form.Item
                  className="mb-0"
                  validateStatus={authForm.usernameError ? 'error' : 'success'}
                  help={authForm.usernameError}
                >
                  <Input
                    value={authForm.username}
                    onChange={(e): void =>
                      this.changeField('username', e.target.value)
                    }
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="text"
                    placeholder="Username"
                  />
                </Form.Item>
              </Col>
              <Col sm={24}>
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
              <Col sm={24}>
                <Form.Item
                  className="mb-0"
                  validateStatus={
                    authForm.confirmPasswordError ? 'error' : 'success'
                  }
                  help={authForm.confirmPasswordError}
                >
                  <Input
                    value={authForm.confirmPassword}
                    onChange={(e): void =>
                      this.changeField('confirmPassword', e.target.value)
                    }
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Item>
              </Col>
              <Col sm={24}>
                <Form.Item
                  className="mb-0"
                  validateStatus={invitationStatus}
                  hasFeedback
                  help={invitationHelp}
                >
                  <Input
                    value={authForm.invitation_code}
                    onChange={(e): void => this.changeRefUser(e.target.value)}
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="text"
                    disabled={authForm.invitation_code === this.refUser}
                    placeholder="Ref user"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <LoadableButton
                    type="primary"
                    htmlType="submit"
                    isFetching={this.props.auth.isFetching}
                    className="login-form-button"
                  >
                    Register
                  </LoadableButton>
                  Or{' '}
                  <Link style={{ color: '#e5371b' }} to={routeName.login}>
                    login now!
                  </Link>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    );
  }
}

export const Register = connect(mapStateToProps, mapDispatchToProps)(Screen);
