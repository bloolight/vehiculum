import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import loadable from '@loadable/component';

import './App.scss';

// Routers
import AppRoute from './layout/AppLayout';
import MainLayout from './layout/MainLayout';

// Utils
import history from './utils/history';

const AsyncMain = loadable(() => import('./pages/Home'));
const Async404 = loadable(() => import('./pages/404'));

function App() {
  return (
      <ConnectedRouter history={history}>
        <Switch>
          <AppRoute exact path="/" layout={MainLayout} component={AsyncMain} />
          <Route component={Async404} />
        </Switch>
      </ConnectedRouter>
  );
}

export default App;
