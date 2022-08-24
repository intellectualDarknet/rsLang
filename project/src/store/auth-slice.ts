import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "../interfaces/auth";
import { AUTH_KEY } from "../config";
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";
import { authService } from "../services/auth-service";
import { store } from "../index";

interface IAuthState {
  auth: IAuth;
  user?: string;
  token?: string;
}

let timerId: number = null;

const createTimer = (callback: VoidFunction) => {
  timerId = window.setTimeout(() => {
    callback();
    clearTimer();
  }, 1000 * 60 * 60 * 4);
};

const clearTimer = () => {
  window.clearTimeout(timerId);
  timerId = null;
};

const initialState: IAuthState = {
  auth: null,
  user: null,
  token: null,
};

const actualState: IAuthState = {
  auth: JSON.parse(localStorage.getItem(AUTH_KEY)) ?? null,
};

export const authSlice = createSlice({
  initialState: actualState,
  name: "auth",
  reducers: {
    logout: () => {
      localStorage.removeItem(AUTH_KEY);
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authService.endpoints.signIn.matchFulfilled,
        (state, { payload }) => {
          state.auth = payload;
          localStorage.setItem(AUTH_KEY, JSON.stringify(payload));

          createTimer(() => {
            store.dispatch(
              authService.endpoints.token.initiate(payload.userId)
            );
          });
        }
      )
      .addMatcher(
        authService.endpoints.token.matchFulfilled,
        (state, { payload }) => {
          state.auth.token = payload.token;
          state.auth.refreshToken = payload.refreshToken;
          localStorage.setItem(AUTH_KEY, JSON.stringify(state.auth));

          createTimer(() => {
            store.dispatch(
              authService.endpoints.token.initiate(payload.userId)
            );
          });
        }
      )
      .addMatcher(authService.endpoints.token.matchRejected, () => {
        localStorage.removeItem(AUTH_KEY);
        clearTimer();
        return initialState;
      });
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;
