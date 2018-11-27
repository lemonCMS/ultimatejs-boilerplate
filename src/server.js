import {
  CookieStorage,
  NodeCookiesWrapper,
} from 'redux-persist-cookie-storage';
import Cookies from 'cookies';
import paths from 'razzle/config/paths'
import express from 'express';
import server, { render } from '@wicked_query/ultimatejs/lib/ultimate/server';
import PersistServer from '@wicked_query/ultimatejs/lib/persist-component/PersistServer';
import initializeStore from './redux/store';
import routes from './routes';
import stats from '../build/react-loadable.json';
import { saveAndRestoreCookie } from './redux/store/counter';
import ErrorPage from './containers/Error';

server.use(Cookies.express());
server.use(express.static(paths.appPublic));
// const dev = process.env.NODE_ENV === 'development';

const devProxy = {
  '/api': {
    target: process.env.RAZZLE_PROXY_HOST,
    // pathRewrite: {'^/api': '/'},
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
      if (req.cookies && req.cookies.get('token')) {
        proxyReq.setHeader(
          'authorization',
          `Bearer ${req.cookies.get('token')}`,
        );
      }
    },
  },
};
if (devProxy) {
  /* eslint-disable-next-line */
  const proxyMiddleware = require('http-proxy-middleware');
  Object.keys(devProxy).forEach(context => {
    server.use(proxyMiddleware(context, devProxy[context]));
  });
}

server
  .use((req, res, next) => {
    next();
  })
  .get('/*', async (req, res) => {
    const cookies = new Cookies(req, res);
    const cookieJar = new NodeCookiesWrapper(cookies);
    const cookiesStorage = new CookieStorage(cookieJar, {
      setCookieOptions: {
        path: '/',
      },
    });
    const providers = {
      cookies: cookiesStorage,
    };

    const wrapper = node => node;
    const awaitRender = ({ store }) => {
      const promise = [];
      promise.push(
        PersistServer({
          store,
          storage: cookiesStorage,
          modules: ['auth', { counters: saveAndRestoreCookie() }],
        }),
      );

      return Promise.all(promise);
    };
    render(
      { req, res },
      stats,
      routes,
      { initializeStore, providers },
      wrapper,
      awaitRender,
      ErrorPage
    );
  });

export default server;
