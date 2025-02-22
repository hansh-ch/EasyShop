import { createSlice } from "@reduxjs/toolkit";

let initialState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {
      currentUser: null,
      isAuthenticated: false,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      return state;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.clear();
      return state;
    },
    updateUser: (state, action) => {
      localStorage.clear();
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      return state;
    },
  },
});
export const { loginUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
