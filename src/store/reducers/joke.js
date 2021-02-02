import { createSlice } from '@reduxjs/toolkit';
import chatService from '../../services/chatService';
import JokeService from '../../services/jokeService';

const initialState = {
  categories: [],
  list: [],
  isInitialized: false,
  isMessageSending: false,
  typingStatus: 'off',
};

export const slice = createSlice({
  name: 'Joke',
  initialState,
  reducers: {
    setJokeList: (state, action) => {
      const { list } = action.payload;
      state.list = list;
    },
    setJokeCategories: (state, action) => {
      const { categories } = action.payload;
      state.categories = categories;
    },
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
  },
});

export const {
  setJokeList,
  setJokeCategories,
  setInitialized,
} = slice.actions;
const jokeService = new JokeService();

const handleError = (error) => (dispatch) => {
  let message;
  try {
    message = error.response.data.error || error.response.data.message;
  } catch {
    message = error.message;
  }
  console.log('*********************', message);
};

export const initJokeList = () => async (dispatch, getState) => {
  try {
    if (getState().joke.isInitialized)
      return;

    const response = await jokeService.searchByQuery({ query: 'all' });

    console.log('response : ', response);

    if (response.result) {
      dispatch(setJokeList({ list: response.result }));
    }


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
