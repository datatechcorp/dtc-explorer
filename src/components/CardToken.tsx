import React from 'react';

type PropsType = {
  title: string;
  children?: string | JSX.Element | JSX.Element[];
  cardStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
};
export const CardToken: React.FC<PropsType> = (props: PropsType) => {
  return (
    <div
      className="card-token"
      style={{
        ...props.cardStyle,
      }}
    >
      <div
        className="card-token-header"
        style={{
          ...props.headerStyle,
        }}
      >
        <div className="card-token-title">{props.title}</div>
      </div>
      <div
        className="card-token-body"
        style={{
          ...props.bodyStyle,
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
