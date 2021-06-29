import { Col, Divider, Dropdown, Icon, Menu, Row } from 'antd';
import { push } from 'connected-react-router';
import htmlToReact from 'html-to-react';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/images/logo/bce-logo.png';
import { routeName } from '../config/route-name';
import { UserStatus } from '../models/user';
import { RootState } from '../redux';
import { authAction } from '../redux/auth';
import { settingAction } from '../redux/setting';
import { UserState } from '../redux/user';
import { CopyableText } from '../components';
import { FaCreditCard } from 'react-icons/fa';
import { AiFillDashboard } from 'react-icons/ai';
import { setting } from '../config/setting';
import utils from '../utils/utils';
import { MenuList } from './MenuList';

// const { Option } = Select;
// const { SubMenu } = Menu;
// const { Meta } = Card;

const CustomMenu = styled.div`
  width: auto;
  min-width: 196px;
  z-index: 15;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 6px 12px 0px;
  position: absolute;
  top: 5px;
  left: calc(50% + 0px);
  transform: translateX(-50%);
  border-width: 1px;
  border-style: solid;
  border-color: rgb(239, 239, 239);
  border-image: initial;
  background: rgb(255, 255, 255);
  list-style: none;
  margin: 0px;
  padding: 10px 0px;
  border-radius: 0px 0px 3px 3px;
  ::before {
    margin-left: -9px;
    bottom: 100%;
    left: 50%;
    content: ' ';
    height: 0px;
    width: 0px;
    position: absolute;
    pointer-events: none;
    border-width: 9px;
    border-style: solid;
    border-color: transparent transparent rgb(255, 255, 255);
    border-image: initial;
    border-bottom: 9px solid rgb(255, 255, 255);
  }
  ::after {
    content: '';
    height: 20px;
    width: 150px;
    top: -20px;
    left: calc(50% - 65px);
    position: absolute;
    display: inline-block;
    background: transparent;
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
    & .ant-list-item-meta {
      align-items: center;
    }
  }
  & .ant-menu.notification {
    padding-bottom: 20px;
    max-height: 300px;
    overflow-y: scroll;
  }
`;
interface UserMenuPropsTypes {
  logout: (e) => void;
  name: string;
  description?: string;
}
interface UserWalletPropsTypes {
  disconnect: (e) => void;
  address: string;
  balance: number;
  bandwidth: number;
  energy: number;
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  user: state.user,
  showSidebar: state.setting.showSidebar,
});
const mapDispatchToProps = {
  disconnect: authAction.disconnect,
  changeSettingFields: settingAction.changeFields,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const UserWallet: React.FC<UserWalletPropsTypes> = (
  props: UserWalletPropsTypes,
) => {
  const { address, balance, bandwidth, energy } = props;
  return (
    <CustomMenu>
      <Menu>
        {/* <Menu.Divider /> */}
        <Menu.Item key="wallet">
          <div className="d-flex align-items-center">
            <Link to={routeName.wallet}>
              <div className="ellipsis_box w-180">
                <div className="ellipsis_box_start">{address}</div>
                <div className="ellipsis_box_end">{address.slice(-5)}</div>
              </div>
            </Link>
            <CopyableText class="menu-copy" value="ali" fontSize="8px" />
          </div>
        </Menu.Item>

        {/* <Menu.Divider /> */}
        <Menu.Item key="balance" className="modified-item">
          <FaCreditCard /> <span>{utils.formatSeparator(balance, 6)}</span>{' '}
          {setting.symbol}
        </Menu.Item>
        <Menu.Item key="bandwidth" className="modified-item">
          <AiFillDashboard /> <span>{bandwidth}</span> <span>Bandwidth</span> /{' '}
          <span>{energy} Energy</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <a href="/" onClick={props.disconnect}>
            Disconnect
          </a>
        </Menu.Item>
      </Menu>
    </CustomMenu>
  );
};
const UserMenu: React.FC<UserMenuPropsTypes> = (props: UserMenuPropsTypes) => (
  <CustomMenu>
    <Menu>
      {/* <Menu.Divider /> */}
      <Menu.Item key="wallet">
        <div className="d-flex align-items-center">
          <Link to={routeName.wallet}>{props.name}</Link>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <a href="!#" onClick={props.logout}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
  </CustomMenu>
);

class Component extends React.Component<ReduxProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: props.location.pathname,
    };
    // if (!props.category.isGot) {
    //   props.getCategories();
    // }

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
  htmlToReactParser = new htmlToReact.Parser();

  static getDerivedStateFromProps = (props, state): any => {
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

  render(): JSX.Element {
    const user: UserState = this.props.user;
    let loginView;
    let connectWallet;

    if (!user._id) {
      loginView = (
        <>
          <Link to={routeName.login} className="navbar-header">
            Login
          </Link>
        </>
      );
    } else {
      loginView = (
        <>
          <Dropdown
            overlay={
              <UserMenu
                name={user.info.username}
                description={`${user.info.first_name || ''} ${
                  user.info.last_name || ''
                }`}
                logout={() => {
                  return null;
                }}
              />
            }
            placement="bottomRight"
            // trigger={['click']}
          >
            <a
              className="navbar-header"
              href="!#"
              onClick={(e) => e.preventDefault()}
            >
              MY ACCOUNT <Icon style={{ fontSize: 8 }} type="down" />
            </a>
          </Dropdown>
        </>
      );
    }
    if (!user.key) {
      connectWallet = (
        <>
          <Link to={routeName.connect} className="navbar-header">
            Connect Wallet
          </Link>
        </>
      );
    } else {
      const { balance, bandwidth, energy } = user;
      connectWallet = (
        <>
          <Dropdown
            overlay={
              <UserWallet
                disconnect={() => this.props.disconnect()}
                address={user.walletAddress}
                balance={balance}
                bandwidth={bandwidth}
                energy={energy}
              />
            }
            placement="bottomRight"
            // trigger={['click']}
          >
            <a
              className="navbar-header address-link"
              href="!#"
              onClick={(e) => e.preventDefault()}
            >
              <div className="ellipsis_box box-head">
                <div className="ellipsis_box_start">{user.walletAddress}</div>
                <div className="ellipsis_box_end">
                  {user.walletAddress.slice(-5)}{' '}
                  <Icon style={{ fontSize: 8 }} type="down" />
                </div>
              </div>
            </a>
          </Dropdown>
        </>
      );
    }
    return (
      <>
        <div className="centerHeader">
          <div className="container">
            <Row
              gutter={[16, 0]}
              type="flex"
              justify="space-between"
              align="middle"
            >
              <Col lg={3} xs={24} md={5}>
                <Link to={routeName.home}>
                  <img className="logo" src={logo} alt="logo" />
                </Link>
              </Col>
              {/* <Col lg={15} xs={24} md={6}>
                <MenuList />
              </Col> */}
              <Col lg={6}>
                <div className="customRow end">
                  {connectWallet}
                  {/* <Divider type="vertical" />
                  {loginView} */}
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="bottomHeader">
          <div className="container">
            <Row type="flex" justify="space-between" align="middle">
              <Col span={24}>
                <MenuList />
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  }
}

export const Header = withRouter(connector(Component) as any);
