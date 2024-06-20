// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    setIsLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser, setIsLoggedIn } = userSlice.actions;
export default userSlice.reducer;
