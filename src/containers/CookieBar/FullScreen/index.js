import React from 'react';
import Loadable from 'react-loadable';

const constLoadable = Loadable({
  loader: () => import('./FullScreen'),
  loading: () => <div>Loading</div>,
});

export default constLoadable;
