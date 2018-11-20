import {
  createStore as _createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import clientMiddleware from '@wicked_query/ultimatejs/lib/redux/middleware';
import createReducers from './store/reducer';

function getNoopReducers(reducers, data) {
  if (!data) return {};
  return Object.keys(data).reduce(
    (prev, next) =>
      reducers[next]
        ? prev
        : {
            ...prev,
            [next]: (state = {}) => state,
          },
    {},
  );
}

export default function initializeStore(initialState, helpers) {
  // return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...[clientMiddleware(), thunkMiddleware])))
  const middleware = [clientMiddleware(helpers), thunkMiddleware];
  const enhancers = [
    process.env.NODE_ENV === 'production'
      ? applyMiddleware(...middleware)
      : composeWithDevTools(applyMiddleware(...middleware)),
  ];
  const finalCreateStore = compose(...enhancers)(_createStore);
  const reducers = createReducers();
  const noopReducers = getNoopReducers(reducers, initialState);
  const store = finalCreateStore(
    combineReducers({ ...noopReducers, ...reducers }),
    initialState,
  );

  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./store/reducer', () => {
      /* eslint-disable-next-line */
      let reducer = require('./store/reducer');
      reducer = combineReducers(
        (reducer.__esModule ? reducer.default : reducer)(store.asyncReducers),
      );
      store.replaceReducer(reducer);
    });
  }

  return store;
}
