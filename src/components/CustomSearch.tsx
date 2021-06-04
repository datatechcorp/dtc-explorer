import React from 'react';
import { Button, Input } from 'antd';
import { RootState } from '../redux';
import { connect, ConnectedProps } from 'react-redux';
import { productAction } from '../redux/product';
import { push } from 'connected-react-router';
import { routeName } from '../config/route-name';
import { BiSearchAlt } from 'react-icons/bi';

const mapStateToProps = (state: RootState): any => ({
  product: state.product.commonProduct,
});

const mapDispatchToProps = {
  changeFields: productAction.changeFields,
  goToPage: push,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsType = ConnectedProps<typeof connector>;

type StateType = {
  text: string;
};
class Search extends React.Component<PropsType, StateType> {
  state = {
    text: '',
  };

  search = (): void => {
    if (this.state.text) {
      this.props.goToPage(routeName.products + '?text=' + this.state.text);
    }
  };

  render(): JSX.Element {
    return (
      <div className="global-search-wrapper">
        <Input
          disabled
          className="search-product"
          placeholder="Search by Address/TXn Hash/Token/Block"
          value={this.state.text}
          onPressEnter={this.search}
          onChange={(event): any => this.setState({ text: event.target.value })}
          suffix={
            <Button
              className="search-btn"
              style={{ marginRight: -12 }}
              onClick={this.search}
            >
              <BiSearchAlt />
            </Button>
          }
        />
      </div>
    );
  }
}

export const CustomSearch = connector(Search);
