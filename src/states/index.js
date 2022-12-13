import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import isPreloadReducer from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import authUserReducer from './authUser/reducer';
import usersReducer from './users/reducer';
import categoriesReducer from './category/reducer';
import commentsReducer from './comments/reducer';

const store = configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    authUser: authUserReducer,
    users: usersReducer,
    categories: categoriesReducer,
    comments: commentsReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
