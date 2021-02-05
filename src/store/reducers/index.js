import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';

import joke from './joke';

export default (history) => combineReducers({
  router: connectRouter(history),
  joke,
});
