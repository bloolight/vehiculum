import { createSlice } from '@reduxjs/toolkit';
import chatService from '../../services/chatService';

const initialState = {
  chatHistory: [],
  isInitialized: false,
  isMessageSending: false,
  typingStatus: 'off',
};

export const slice = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    insertChatHistory: (state, action) => {
      const {from, message} = action.payload;
      let history = state.chatHistory;
      history.push({
        from: from,
        message: message
      });
      state.chatHistory = history;
    },
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
    setMessageSending: (state, action) => {
      state.isMessageSending = action.payload;
    },
    setTypingStatus: (state, action) => {
      state.typingStatus = action.payload;
    },
  },
});

export const {
  insertChatHistory,
  setInitialized,
  setMessageSending,
  setTypingStatus,
} = slice.actions;

const handleError = (error) => (dispatch) => {
  let message;
  try {
    message = error.response.data.error || error.response.data.message;
  } catch {
    message = error.message;
  }
  console.log('*********************', message);
};

export const initChat = () => async (dispatch, getState) => {
  try {
    if (getState().chat.isInitialized)
      return;

    await chatService.initMessanger();

    chatService.setOutputListener((payload) => {
      dispatch(insertChatHistory({from: payload.source, message: payload.text}));
    });
    chatService.setFinalPingListener(() => {
      dispatch(setMessageSending(false));
    });
    chatService.setTypingStatusListener((status) => {
      dispatch(setTypingStatus(status));
    });
    chatService.setErrorListener((error) => {
      console.log('An exception has been occurred', error);
    });

    dispatch(setInitialized(true));

  } catch (error) {
    dispatch(handleError(error));
  }
};

export const sendMessage = (msg, callback, retry = 0) => async (dispatch) => {
  try {
    await chatService.sendMessage(msg);
    dispatch(insertChatHistory({from: 'user', message: msg}));
    if (callback) {
      callback();
    }
  } catch (error) {
    dispatch(handleError(error));
  }
};

export default slice.reducer;
