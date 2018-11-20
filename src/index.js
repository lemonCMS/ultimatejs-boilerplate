import express from 'express';
import Loadable from 'react-loadable';

let app = require('./server').default;

if (module.hot) {
  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      /* eslint-disable-next-line */
      app = require('./server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
Loadable.preloadAll().then(() => {
  console.log(`> Starting on port http://${host}:${port}`);
  express()
    .use((req, res) => app.handle(req, res))
    .listen(port, host, err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`> Started on port http://${host}:${port}`);
    });
});
