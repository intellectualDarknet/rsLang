import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { learnWordsService } from "../services/learn-words-service";
import { ILearnWord } from "../interfaces/learn-words";

interface IWordsState {
  wordsToRepeat: ILearnWord[];
  wordsToLearn: ILearnWord[];
}

const initialState: IWordsState = {
  wordsToRepeat: [],
  wordsToLearn: [],
};

export const learnWordsSlice = createSlice({
  initialState,
  name: "learnWordsSlice",
  reducers: {
    removeById: (state, action: PayloadAction<string>) => {
      state.wordsToLearn = state.wordsToLearn.filter(
        (ILearnWord: ILearnWord) => ILearnWord.language !== "133"
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      learnWordsService.endpoints.getWordsToLearn.matchFulfilled,
      (state, { payload }) => {
        state.wordsToLearn = payload;
      }
    );

    builder.addMatcher(
      learnWordsService.endpoints.getWordsToRepeat.matchFulfilled,
      (state, { payload }) => {
        state.wordsToRepeat = payload;
      }
    );

    builder.addMatcher(
      learnWordsService.endpoints.createWord.matchFulfilled,
      (state, { payload }) => {
        state.wordsToLearn = [...state.wordsToLearn, payload];
      }
    );

    builder.addMatcher(
      learnWordsService.endpoints.updateWord.matchFulfilled,
      (state, { payload }) => {
        state.wordsToRepeat = state.wordsToRepeat.filter(
          (word) => word.writings != payload.writings
        );
        state.wordsToLearn = state.wordsToLearn.filter(
          (word) => word.writings != payload.writings
        );
      }
    );
  },
});

export const { removeById } = learnWordsSlice.actions;

export default learnWordsSlice.reducer;
