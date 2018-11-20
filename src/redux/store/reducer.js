import multireducer from 'multireducer';
import store from '@wicked_query/ultimatejs/lib/redux/store/reducer';
import routesState from '@wicked_query/ultimatejs/lib/redux/routeState/reducer';
import auth from './auth';
import storage from './storage';
import counters from './counter';

export default function createReducers(asyncReducers) {
  return {
    store,
    routesState,
    auth,
    storage,
    counters: multireducer({
      counterCookie: counters,
      counterLocalStorage: counters,
    }),
    ...asyncReducers,
  };
}
