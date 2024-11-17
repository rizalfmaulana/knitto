import { loginUser } from "@/services/authApi";
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    authLoading: false,
    token: "",
    error: "",
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.authLoading = false;
        state.isAuthenticated = true;
        // state.token = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.authLoading = false;
        state.isAuthenticated = false;
        // state.error = payload;
      });
  },
});

export const { login, logout } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type

// export const selectAuth = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;
