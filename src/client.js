import React from 'react';
import { CookieStorage } from 'redux-persist-cookie-storage';
import localForage from 'localforage';
import CookiesJS from 'cookies-js';
import PersistServer from '@wicked_query/ultimatejs/lib/persist-component/PersistServer';
import PersistComponent from '@wicked_query/ultimatejs/lib/persist-component/PersistComponent';
import client, { trigger } from '@wicked_query/ultimatejs/lib/ultimate/client';
import { authRestore } from './redux/store/auth';
import {
  saveAndRestoreCookie,
  saveAndRestoreLocal,
} from './redux/store/counter';
import initializeStore from './redux/store';
import routes from './routes';
import ErrorPage from './containers/Error';

const cookiesStorage = new CookieStorage(CookiesJS, {
  setCookieOptions: {
    path: '/',
  },
});

(async () => {
  const providers = { cookies: cookiesStorage };
  const state = window.__PRELOADED_STATE__ || {};

  const reduxWrapper = ultimate => (
    <PersistComponent
      storage={cookiesStorage}
      modules={[{ counters: saveAndRestoreCookie() }, { auth: authRestore() }]}
    >
      <PersistComponent
        storage={localForage}
        modules={[{ counters: saveAndRestoreLocal() }]}
      >
        {ultimate}
      </PersistComponent>
    </PersistComponent>
  );

  const awaitRender = ({ store }) => {
    const promise = [];
    const restoreState = PersistServer({
      store,
      storage: cookiesStorage,
      modules: [{ auth: authRestore() }],
    });
    promise.push(restoreState);
    return Promise.all(promise);
  };

  client(
    routes,
    { initializeStore, state, providers },
    reduxWrapper,
    awaitRender,
    ErrorPage
  );

  if (module.hot) {
    module.hot.accept('./routes', () => {
      /* eslint-disable-next-line */
      const _routes = require('./routes').default;
      trigger(_routes);
    });
  }
})();
