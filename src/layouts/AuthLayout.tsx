import React from 'react';
import { Row, Col, Layout, Card } from 'antd';
import logo from '../assets/images/logo/bce-logo.png';
import { Link } from 'react-router-dom';
import { routeName } from '../config/route-name';
import bg from '../assets/images/bg/bg-auth.svg';
import auth from '../assets/images/auth-img.svg';

const { Content } = Layout;

export class AuthLayout extends React.Component<any, {}> {
  render(): JSX.Element {
    return (
      <div
        style={{
          background: `url('${bg}')`,
        }}
        className="auth-layout"
      >
        <div className="container">
          <Row>
            <Col span={24}>
              <Card bordered={false} className="form-login">
                <Row type="flex" align="middle" justify="center">
                  <Col span={24} lg={16} md={24} xs={24}>
                    <Link to={routeName.home}>
                      <div className="logo_login text-center">
                        <img
                          src={logo}
                          alt="images logo"
                          style={{
                            width: '150px',
                            margin: '24px 0',
                          }}
                        ></img>
                      </div>
                    </Link>
                    <div className="auto-center">
                      <Content>{this.props.children}</Content>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
