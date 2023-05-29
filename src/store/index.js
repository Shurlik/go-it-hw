import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postsSlices from "./posts/posts.slices";

const rootReducer = combineReducers({
  posts: postsSlices,
});

export const store = configureStore({
  reducer: rootReducer,
});
