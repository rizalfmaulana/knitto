import { loginUser } from "@/services/authApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    authReset: (state) => {
      state.isAuthenticated = false;
      state.authLoading = false;
      state.token = "";
      state.error = "";
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
        state.token = payload.key;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.authLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout, authReset } = authSlice.actions;

export default authSlice.reducer;
