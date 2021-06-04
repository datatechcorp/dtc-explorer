import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export interface ValidateResult {
  error: any;
  redirectPath: string | null;
}

type PropsType = {
  validate: (state: any) => ValidateResult;
  state: any;
  path: string;
  exact: boolean;
  routeProps: any;
  location?: any;
};

export const AuthRoute = (props: PropsType): JSX.Element => {
  const result = props.validate(props.state);
  if (result.error) {
    const location = props.location;
    let redirectPath = result.redirectPath as string;

    if (location.pathname && location.search) {
      redirectPath +=
        '?returnUrl=' + encodeURIComponent(location.pathname + location.search);
    }
    console.log('RedirectPath', redirectPath);

    return (
      <Route
        path={props.path}
        exact={props.exact}
        render={(): JSX.Element => <Redirect to={redirectPath} />}
      />
    );
  }
  return <Route path={props.path} exact={props.exact} {...props.routeProps} />;
};
