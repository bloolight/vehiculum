import { createSlice } from '@reduxjs/toolkit';
import JokeService from '../../services/jokeService';

const initialState = {
  categories: [],
  list: [],
  colors: ['#ff5b5b', '#ff915b', '#ffbe5b', '#ffdf5b', '#8fe360', '#57e690', '#57dbe6'],
  joke: null,
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
    setJoke: (state, action) => {
      state.joke = action.payload;
    }
  },
});

export const {
  setJokeList,
  setJokeCategories,
  setInitialized,
  setJoke,
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

    if (response.result) {
      dispatch(setJokeList({ list: response.result }));
    }


    dispatch(setInitialized(true));

  } catch (error) {
    dispatch(handleError(error));
  }
};

export const initJokeCategories = () => async (dispatch) => {
  try {
    const response = await jokeService.pullCategories();

    if (response.length > 0) {
      const categories = response.map((item, index) => {
        return {
          name: item,
          color: initialState.colors[index % initialState.colors.length],
        }
      });

      dispatch(setJokeCategories({categories: categories}));
    }
  } catch (error) {
    dispatch(handleError(error));
  }
};

export default slice.reducer;
