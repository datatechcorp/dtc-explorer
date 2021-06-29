import React from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';

type PropsType = {
  title: string;
  children?: string | JSX.Element | JSX.Element[] | any;
  cardStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  active?: boolean;
};
export class TokenType extends React.Component<PropsType, any> {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
    };
  }

  toggleClass = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  };
  render(): JSX.Element {
    const props = this.props;
    return (
      <div
        // onClick={this.toggleClass}
        className={`serviceBox ${this.state.active ? 'active' : ''}`}
        style={{
          ...props.cardStyle,
        }}
      >
        <h3
          className="title"
          style={{
            ...props.headerStyle,
          }}
        >
          {props.title}
        </h3>
        <p
          className="description"
          style={{
            ...props.bodyStyle,
          }}
        >
          {props.children}
        </p>
        <div className="read-more">
          <FaArrowCircleRight />
        </div>
      </div>
    );
  }
}
