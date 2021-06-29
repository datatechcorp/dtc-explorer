import { Col, Divider, Drawer, Menu, Modal, Row } from 'antd';
import { push } from 'connected-react-router';
import React from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { CgMenuRight } from 'react-icons/cg';
import { FaCreditCard } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { connect, ConnectedProps } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/images/logo/bce-logo.png';
import { CopyableText } from '../components';
import { routeName } from '../config/route-name';
import { setting } from '../config/setting';
import { UserStatus } from '../models/user';
import { RootState } from '../redux';
import { authAction } from '../redux/auth';
import { settingAction } from '../redux/setting';
import { UserState } from '../redux/user';
import { MenuList } from './MenuList';

const CustomMenu = styled.div`
  width: auto;
  z-index: 15;
  /* box-shadow: rgba(0, 0, 0, 0.18) 0px 6px 12px 0px; */
  list-style: none;
  border: none;
  & .ant-menu {
    border: none;
    /* position: fixed;
    left: 0;
    right: 0; */
  }
  & .itemNotification {
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: center;
    justify-content: center;
    font-size: 13px;
    letter-spacing: 0.1px;
    cursor: pointer;
    overflow: hidden;
    border-bottom: 1px solid rgb(212, 212, 212);
    /* background: rgba(211, 246, 255, 0.6); */
    background: white;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    & .ant-list-item-meta-content {
      align-self: center;
    }
  }
  & .ant-menu.notification {
    padding-bottom: 20px;
    max-height: 300px;
    overflow-y: scroll;
  }
`;
interface UserMenuPropsTypes {
  name: string;
  description?: string;
  logout: (e) => void;
}
interface UserWalletPropsTypes {
  name: string;
  description?: string;
  logout: (e) => void;
}
const UserWallet: React.FC<UserWalletPropsTypes> = (
  props: UserWalletPropsTypes,
) => (
  <CustomMenu>
    <Menu>
      <Menu.Item key="wallet">
        <div className="d-flex align-items-center">
          <Link to={routeName.wallet}>
            <div className="ellipsis_box w-180">
              <div className="ellipsis_box_start">
                TSQNwvocG78iijtuwmy566KKgffbTJ
              </div>
              <div className="ellipsis_box_end">ptpK</div>ƒ
            </div>
          </Link>
          <CopyableText class="menu-copy" value="ali" fontSize="8px" />
        </div>
      </Menu.Item>

      {/* <Menu.Divider /> */}
      <Menu.Item key="0">
        <Link to={routeName.enterprise.dashboard}>
          <FaCreditCard /> <span>4,998.797</span> {setting.symbol}
        </Link>
      </Menu.Item>
      <Menu.Item key="0">
        <Link to={routeName.enterprise.dashboard}>
          <AiFillDashboard /> <span>5,000</span> <span>Bandwidth</span> /{' '}
          <span>0 Energy</span>
        </Link>
      </Menu.Item>

      {/* <Menu.Divider /> */}
      <Menu.Item key="logout">
        <a onClick={props.logout}>Exit Wallet</a>
      </Menu.Item>
    </Menu>
  </CustomMenu>
);
const UserMenu: React.FC<UserMenuPropsTypes> = (props: UserMenuPropsTypes) => (
  <CustomMenu>
    <Menu>
      {/* <Menu.Divider /> */}
      <Menu.Item key="wallet">
        <div className="d-flex align-items-center">
          <Link to={routeName.wallet}>{props.name}</Link>
        </div>
      </Menu.Item>
      {/* <Menu.Divider /> */}
      <Menu.Item key="logout">
        <a onClick={props.logout}>Logout</a>
      </Menu.Item>
    </Menu>
  </CustomMenu>
);
const mapStateToProps = (state: RootState) => ({
  user: state.user,
  showSidebar: state.setting.showSidebar,
});
const mapDispatchToProps = {
  logout: authAction.logout,
  changeSettingFields: settingAction.changeFields,
  goToPage: push,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

class Component extends React.Component<ReduxProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      showing: 'block',
      currentPath: props.location.pathname,
      visible: false,
      placement: 'right',
      visibleSearch: false,
    };

    if (props.location.pathname === routeName.home && window.innerWidth > 500) {
      props.changeSettingFields({
        showSidebar: true,
      });
    } else {
      props.changeSettingFields({
        showSidebar: false,
      });
    }

    const user: UserState = props.user;
    if (
      user._id &&
      user.info &&
      user.info.status === UserStatus.Active &&
      !props.cart.isGot &&
      !props.cart.isFetching
    ) {
      props.getCart();
    }
    if (user._id && user.info && user.info.status === UserStatus.Active) {
      props.getMyNotification();
    }
  }

  static getDerivedStateFromProps = (props, state): any => {
    if (props.location.pathname === state.currentPath) {
      return null;
    }
    if (props.location.pathname === routeName.home && window.innerWidth > 500) {
      props.changeSettingFields({
        showSidebar: true,
      });
    } else {
      props.changeSettingFields({
        showSidebar: false,
      });
    }

    const user: UserState = props.user;
    if (
      user._id &&
      user.info &&
      user.info.status === UserStatus.Active &&
      !props.cart.isGot &&
      !props.cart.isFetching
    ) {
      props.getCart();
    }
    return {
      showing: props.location.pathname === routeName.home ? 'none' : 'block',
      currentPath: props.location.pathname,
    };
  };

  toggleCollapsed = (): void => {
    this.props.changeSettingFields({
      showSidebar: !this.props.showSidebar,
    });
  };

  showDrawer = (): void => {
    this.setState({
      visible: true,
    });
  };

  onCloseDrawer = (): void => {
    this.setState({
      visible: false,
    });
  };

  onChangeDrawer = (e): void => {
    this.setState({
      placement: e.target.value,
    });
  };
  showSearch = () => {
    this.setState({
      visibleSearch: true,
    });
  };
  cancelSearch = (e) => {
    this.setState({
      visibleSearch: false,
    });
  };
  render(): JSX.Element {
    const user: UserState = this.props.user;

    let loginView;

    if (!user._id) {
      loginView = (
        <>
          <Divider className="my-1" />
          <Link
            to={routeName.login}
            style={{ padding: '0 8px', color: 'rgba(0, 0, 0, 0.65)' }}
          >
            Connect Wallet
          </Link>

          {/* <Link
            to={routeName.login}
            style={{ padding: '0 16px', color: 'rgba(0, 0, 0, 0.65)' }}
          >
            Login
          </Link> */}

          {/* <Divider className="my-1" /> */}
        </>
      );
    } else {
      loginView = (
        <>
          <div className="profileBox">
            <IoIosClose
              onClick={this.onCloseDrawer}
              className="sidebar-close"
            />
          </div>
          <UserWallet
            name={user.info.username}
            description={`${user.info.first_name || ''} ${
              user.info.last_name || ''
            }`}
            logout={(): void => this.props.logout()}
          />
          <Divider />
          <UserMenu
            name={user.info.username}
            description={`${user.info.first_name || ''} ${
              user.info.last_name || ''
            }`}
            logout={(): void => this.props.logout()}
          />
        </>
      );
    }

    return (
      <>
        <div className="container-fluid">
          <Row
            gutter={[8, 8]}
            type="flex"
            align="middle"
            justify="space-around"
          >
            <Col span={24} className="text-center">
              <div className="customRow">
                <Link to={routeName.home}>
                  <img className="logo" src={logo} alt="logo" />
                </Link>
                <div className="d-flex">
                  <div
                    className="navbar-header notiBadge"
                    onClick={this.showSearch}
                  >
                    <BiSearchAlt />
                  </div>
                  <div
                    className="navbar-header notiBadge"
                    onClick={this.showDrawer}
                  >
                    <CgMenuRight />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        {/* drawer sidebar */}
        <Drawer
          placement={this.state.placement}
          closable={false}
          onClose={this.onCloseDrawer}
          visible={this.state.visible}
          className="drawer-sidebar"
        >
          <MenuList />
          {loginView}
        </Drawer>
        {/* <div className="container none-mobile">
          <Row>
            <Col span={4}>
              <MenuNav showMenu={this.props.showSidebar} className="megaMenu" />
            </Col>
          </Row>
        </div> */}
      </>
    );
  }
}

export const MobileHeader = withRouter(connector(Component) as any);
