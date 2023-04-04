import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { wordsService } from "../services/words-service";
import { authService } from "../services/auth-service";
import { userWordsService } from "../services/user-words-service";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { aggregatedWordsService } from "../services/aggregated-words-service";
import { statisticsService } from "../services/statistics-service";
import wordsReducer from "./words-slice";
import sequenceReducer from "./sequence-slice";
import authReducer from "./auth-slice";
import sprintReducer from "./sprint-slice";
import audioCallSettingsReducer from "./audiocall-settings-slice";
import audioCallReducer from "./audiocall-slice";
import keyboardReducer from "./keyboard-slice";
import statisticsReducer from "./statistics-slice";
import { sequenceService } from "../services/sequence-service";

export const rootReducer = combineReducers({
  [wordsService.reducerPath]: wordsService.reducer,
  [sequenceService.reducerPath]: sequenceService.reducer,
  [authService.reducerPath]: authService.reducer,
  [aggregatedWordsService.reducerPath]: aggregatedWordsService.reducer,
  [userWordsService.reducerPath]: userWordsService.reducer,
  [statisticsService.reducerPath]: statisticsService.reducer,
  sequenceState: sequenceReducer,
  wordsState: wordsReducer,
  authState: authReducer,
  audioCallReducer,
  audioCallSettingsReducer,
  statisticsState: statisticsReducer,
  sprintState: sprintReducer,
  keyboardState: keyboardReducer,
});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(
        sequenceService.middleware,
        wordsService.middleware,
        authService.middleware,
        aggregatedWordsService.middleware,
        userWordsService.middleware,
        statisticsService.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
