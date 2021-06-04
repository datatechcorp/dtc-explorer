import React from 'react';

export class LoaderLayout extends React.Component<any, {}> {
  render(): JSX.Element {
    return (
      <div
        style={{
          backgroundColor: '#034b29',
          overflow: 'hidden',
          width: '100vw',
          height: '100vh',
        }}
      >
        <div className="body">
          <span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div className="base">
            <span></span>
            <div className="face"></div>
          </div>
        </div>
        <div className="longfazers">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h1
          style={{
            position: 'absolute',
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            left: '50%',
            top: '58%',
            marginLeft: '-20px',
            color: '#fff',
          }}
        >
          Redirecting
        </h1>
      </div>
    );
  }
}
