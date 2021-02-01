import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';

import chat from './chat';

export default (history) =>
    combineReducers({
      router: connectRouter(history),
      chat,
    });
