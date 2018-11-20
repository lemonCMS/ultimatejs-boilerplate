import React from 'react';
import Loadable from 'react-loadable';

const constLoadable = Loadable({
  loader: () => import('./Register'),
  loading: () => <div>Loading</div>,
});

export default constLoadable;
