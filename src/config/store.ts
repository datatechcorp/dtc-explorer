import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { history } from './history';

export function configureStore(reducer: any, preloadedState?: any): any {
  const store = createStore(
    reducer, // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
      ),
    ),
  );

  return store;
}
