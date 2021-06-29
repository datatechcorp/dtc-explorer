import { Card, Col, Layout, Menu, Row, Select, Typography } from 'antd';
import React from 'react';
import { FaCopyright, FaFacebook, FaTelegram, FaYoutube } from 'react-icons/fa';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import logo from '../assets/images/logo/tron-logo.png';
import { Header as CustomHeader, MobileHeader } from '../components';
import { UserInfo } from '../models/user';
import { RootState } from '../redux';
import { settingAction } from '../redux/setting';
import { storage } from '../utils/storage';

const { Content, Header } = Layout;

const mapStateToProps = (state: RootState) => ({
  showSidebar: state.setting.showSidebar,
});
const mapDispatchToProps = {
  changeSettingFields: settingAction.changeFields,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsTypeFromRedux = RouteComponentProps &
  ConnectedProps<typeof connector> & {
    location: any;
  };
type State = {
  current: string;
  width: number;
  collapsed: boolean;
  users: UserInfo[];
};
class Screen extends React.Component<PropsTypeFromRedux, State> {
  constructor(props) {
    super(props);
    // if (!props.category.isGot) {
    //   props.getCategories();
    // }
    // props.getPartners();
  }
  state: State = {
    width: window.innerWidth,
    collapsed: false,
    current: this.props.location.pathname || 'home',
    users: [],
  };
  handleClick: (e) => void = (e) => {
    this.setState({
      current: e.key,
    });
  };
  onCollapse = (collapsed): void => {
    this.props.changeSettingFields({
      showSidebar: !collapsed,
    });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render(): JSX.Element {
    const { width } = this.state;

    return (
      <Layout>
        <Header className="header none-mobile">
          <CustomHeader />
        </Header>
        <Header
          className="none-desktop header"
          style={{ position: 'fixed', zIndex: 10, padding: '0', width: '100%' }}
        >
          <MobileHeader />
        </Header>
        <Layout>
          <Content className="layout-content">{this.props.children}</Content>
        </Layout>
        {/* <Footer className="footer">
          <div className="container">
            <Row gutter={[8, 16]}>
              <Col lg={6} xs={24} md={12}>
                <img className="logo" src={logo} />
                <p className="support">
                  <a href="https://goo.gl/maps/qjcsz77to3nxgUxu9">
                    Address: 38 Block Street, Sydney, AU
                  </a>
                  <br />
                  <a href="#">Address: 1429 Netus Rd, NY 48247</a>
                  <br />
                  <a
                    href="mailto: support@DataTechCorp.com"
                    rel="noopener noreferrer"
                  >
                    Email: support@DataTechCorp.com
                  </a>
                </p>
              </Col>

              <Col lg={6} xs={24}>
                <div className="list-category">
                  <h2 className="title no-border">Customer Care</h2>
                  <div className="separator"></div>
                  <div className="list-group mt-30">
                    <div className="list-group-item">
                      <a href="#">My account</a>
                      <a href="#">Shopping cart</a>
                      <a href="#">Wishlist</a>
                      <a href="#">Order History</a>
                      <a href="#">Sales & Refunds</a>
                      <a href="#">Privacy Policy</a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={6} xs={24}>
                <div className="list-category">
                  <h2 className="title no-border">Find In Fast</h2>
                  <div className="separator"></div>
                </div>
              </Col>
              <Col lg={6} xs={24}>
                <div className="list-category">
                  <h2 className="title no-border">Contact</h2>
                  <div className="separator"></div>
                  <div className="list-group mt-30">
                    <a
                      style={{ padding: 8, fontSize: 24 }}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook />
                    </a>

                    <a
                      style={{ padding: 8, fontSize: 24 }}
                      href="https://t.me/gemcoinchannel?zdlink=Uo9XRcHoRsba8ZeYRt9dBdHbR6LdSc5jBcrbStDbRcTbSY8i8cblSo8wUo9pOsXbRMLVTN9i8ZeYUc5iRoqsE3OqD3auC3SwN2zSBo8i8c5mS6ba8ZeYDZWsD3GvE30t8drz"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTelegram />
                    </a>

                    <a
                      style={{ padding: 8, fontSize: 24 }}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaYoutube />
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Footer> */}
        <div className="footer-bottom">
          <div className="container">
            <Row>
              <Col span={24}>
                <p>
                  Design by DataTechCorp <FaCopyright /> 2021. All right
                  reserved
                </p>
              </Col>
            </Row>
          </div>
        </div>
      </Layout>
    );
  }
}

export const MainLayout = connector(withRouter(Screen));
