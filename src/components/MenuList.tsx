import React from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { CategoryState, categoryAction } from '../redux/category';
import { connect, ConnectedProps } from 'react-redux';
import { routeName } from '../config/route-name';
import { RouteComponentProps } from 'react-router';

const { SubMenu } = Menu;

const mapStateToProps = (state: any): { category: CategoryState } => ({
  category: state.category,
});
const mapDispatchToProps = {
  changeFields: categoryAction.changeFields,
  getCategories: categoryAction.getCategories,
};

interface State {
  current: string;
  width?: number;
}

const connector = connect<
  ReturnType<typeof mapStateToProps>,
  typeof mapDispatchToProps,
  PropTypes
>(mapStateToProps, mapDispatchToProps);
// type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromRedux = ConnectedProps<typeof connector>;
interface PropTypes {
  location?: any;
}
class MenuListClass extends React.Component<
  PropsFromRedux & PropTypes & RouteComponentProps,
  any
> {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      current: props.location.pathname || 'home',
    };
  }
  // state = {

  //   current: this.props.location.pathname || 'home',
  // };
  handleClick: (e) => void = (e) => {
    this.setState({
      current: e.key,
    });
    // if (e.key === 'logout') {
    //   this.props.logout();
    // }
  };
  static getDerivedStateFromProps(nextProps, state): any {
    const key = nextProps.location.pathname;
    if (key != state.current) {
      return { current: key };
    }
    return null;
  }
  render(): JSX.Element {
    const { category } = this.props;
    const { width } = this.state;
    const isMobile = width <= 500;
    return (
      <>
        <Menu
          className="menu-list"
          mode={isMobile ? 'vertical' : 'horizontal'}
          selectedKeys={[this.state.current]}
        >
          <Menu.Item key={routeName.home}>
            <Link to={routeName.home}>
              <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key={routeName.wallet}>
            <Link to={routeName.wallet}>
              <span>Wallet</span>
            </Link>
          </Menu.Item>
          <Menu.Item key={routeName.createToken}>
            <Link to={routeName.createToken}>
              <span>Create Token</span>
            </Link>
          </Menu.Item>
          {/* {category.tree.map((item) => (
            <SubMenu
              key={item._id}
              title={
                <Link
                  to={`${routeName.products}?category=${item._id}`}
                  className="itemNavigation"
                >
                  <span>{item.title}</span>
                </Link>
              }
            >
              {item.children.map((child) => (
                <Menu.Item key={child._id}>
                  <Link
                    to={`${routeName.products}?category=${child._id}`}
                    className="itemNavigation"
                  >
                    <span>{child.title}</span>
                  </Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ))} */}

          {/* <Menu.Item key="app">Navigation Two</Menu.Item>
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                Navigation Three - Submenu
              </span>
            }
          >
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu> */}
        </Menu>
      </>
    );
  }
}
export const MenuList = connector(withRouter(MenuListClass));
