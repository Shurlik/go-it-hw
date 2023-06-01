import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, //{displayName, email, photoUR, uidL}
  tokens: null, //{accessToken, refreshToken}
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setTokens(state, action) {
      state.tokens = action.payload;
    },
    logout(state) {
      state.user = null;
      state.tokens = null;
    },
  },
});

export default userSlice.reducer;

export const { setUser, setTokens, logout } = userSlice.actions;
