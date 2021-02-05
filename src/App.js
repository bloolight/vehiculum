import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import loadable from '@loadable/component';

import './App.scss';

// Routers
import AppRoute from './layout/AppLayout';
import MainLayout from './layout/MainLayout';

// Utils
import history from './utils/history';
import { initJokeCategories, initJokeList } from './store/reducers/joke';
import { useDispatch } from 'react-redux';

const AsyncMain = loadable(() => import('./pages/Home'));
const AsyncJoke = loadable(() => import('./pages/Joke'));
const Async404 = loadable(() => import('./pages/404'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initJokeList());
    dispatch(initJokeCategories());
  }, []);

  return (
      <ConnectedRouter history={history}>
        <Switch>
          <AppRoute exact path="/" layout={MainLayout} component={AsyncMain} />
          <AppRoute exact  path="/joke/:id" layout={MainLayout} component={AsyncJoke} />
          <Route component={Async404} />
        </Switch>
      </ConnectedRouter>
  );
}

export default App;
