import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Local'),
  loading: () => <div>Loading</div>,
});

