import React from 'react';
import { routes } from './config/routes';
import { Provider, connect } from 'react-redux';
import { history } from './config/history';
import { configureStore } from './config/store';
import { reducer, RootState } from './redux';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
import { setting } from './config/setting';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from './utils/storage';
import { userAction, DeviceStatus } from './redux/user';
import { settingAction } from './redux/setting';
import queryParse from 'query-string';
import { routeName } from './config/route-name';
import { authAction } from './redux/auth';
import { notification } from './utils/notification';
import { AuthRoute } from './components/AuthRoute';
import { Switch, Redirect } from 'react-router-dom';
import { firebaseUtils } from './utils/firebase';
import { notificationAction } from './redux/notification';
import { currencyFormatter } from './utils/currency-formatter';
import { walletAction } from './redux/wallet';

firebaseUtils.init();

axios.defaults.baseURL = setting.backendHost;
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['crossdomain'] = true;

const store = configureStore(reducer);

// store.dispatch(settingAction.getConfigs());

const fromAdminRegex = /\?user_id=.*&token=.*/g;
if (
  fromAdminRegex.test(window.location.search)
  // window.location.pathname === routeName.login
) {
  const query = queryParse.parse(window.location.search);
  if (typeof query.user_id !== 'string' && typeof query.token !== 'string') {
    notification.error('Something went wrong');
  } else {
    store.dispatch(
      authAction.loginFromAdmin(query.user_id as string, query.token as string),
    );
  }
} else {
  const key = storage.loadConnectKey();
  if (key) {
    store.dispatch(userAction.getInfoFromConnectKey(key));
  }
  // const oldData = storage.loadUser();
  // if (oldData) {
  //   axios.defaults.headers.common[
  //     'Authorization'
  //   ] = `Bearer ${oldData.access_token}`;
  //   store.dispatch(
  //     userAction.changeFields({
  //       _id: oldData.user._id,
  //       info: oldData.user,
  //       access_token: oldData.access_token,
  //     }),
  //   );
  //   store.dispatch(userAction.getMyInfo());
  //   store.dispatch(walletAction.getAllCoins());
  //   store.dispatch(walletAction.getMyWallets());
  //   firebaseUtils.getNotificationToken().then((token) => {
  //     if (token) {
  //       store.dispatch(
  //         userAction.addOrUpdateDevice(token, DeviceStatus.Active),
  //       );
  //     }
  //   });
  // }
}

//if old country existed, must dispatch immediately to fix bug first load product without country
const oldCountry = storage.loadCountry();
if (oldCountry) {
  if (oldCountry.currency_code) {
    currencyFormatter.setCurrency(oldCountry.currency_code);
  }
  store.dispatch(
    settingAction.changeFields({
      country: oldCountry,
    }),
  );
}
// addressAction
// .getCountries()(store.dispatch)
// .then((success) => {
//   if (success) {
//     const oldCountry = storage.loadCountry();
//     if (oldCountry) {
//       const countries = store.getState().address.countries;
//       const exist = countries.find((item) => item._id === oldCountry._id);
//       if (exist) {
//         if (exist.currency_code) {
//           currencyFormatter.setCurrency(exist.currency_code);
//         }
//         store.dispatch(
//           settingAction.changeFields({
//             country: oldCountry,
//           }),
//         );
//       } else {
//         storage.saveCountry(null);
//       }
//     }
//   }
// });

firebaseUtils.onMessage((payload) => {
  if (!payload) {
    return;
  }
  console.log('Firebase message', payload);
  if (payload.notification && payload.notification.title) {
    notification.success(payload.notification.title);
  }

  try {
    const state: RootState = store.getState();
    if (state.user._id) {
      store.dispatch(notificationAction.getMyNotification());
    }
  } catch (err) {
    console.log('Get notification error');
  }
});

const App: React.FC = (props: any) => {
  return (
    <div>
      <ConnectedRouter history={history}>
        <Switch>
          {routes.map((item) => {
            const Layout = item.layout;
            const Component = item.component;
            const renderPage = (props): JSX.Element => (
              <Layout>
                <Component {...props} />
              </Layout>
            );
            return (
              <AuthRoute
                key={item.path}
                validate={item.validate}
                state={props.user}
                exact={item.exact || false}
                path={item.path}
                routeProps={{
                  render: renderPage,
                }}
              />
            );
          })}
          <Redirect to={routeName.home} />
        </Switch>
      </ConnectedRouter>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state): any => ({
  user: state.user,
});

const AppWithState = connect(mapStateToProps, null)(App);

const AppWithRedux: React.FC = () => {
  return (
    <Provider store={store}>
      <AppWithState />
    </Provider>
  );
};

export default AppWithRedux;
