import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  role: null,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.role = action.payload.role.type;
      state.userData = action.payload;
    },
    logout: (state, action) => {
      state.status = false;
      state.role = null;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
