import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Wrap'),
  loading: () => <div>Loading</div>,
});

