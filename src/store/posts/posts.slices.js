import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  comments: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    clearPosts(state) {
      state.posts = [];
    },
  },
});

export default postsSlice.reducer;

export const { setPosts, clearPosts } = postsSlice.actions;
