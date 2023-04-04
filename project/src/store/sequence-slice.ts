import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sequence } from "../interfaces/sequence";
import { SequenceWord, Word } from "../interfaces/word";
import { sequenceService } from "../services/sequence-service";

interface IWordsState {
  sequenceWords: SequenceWord[];
  sequences: Sequence[];
}

const initialState: IWordsState = {
  sequenceWords: null,
  sequences: null,
};

export const sequenceSlice = createSlice({
  initialState,
  name: "sequenceWords",
  reducers: {
    removeById: (state, action: PayloadAction<string>) => {
      state.sequenceWords = state.sequenceWords.filter(
        (SequenceWord: SequenceWord) => SequenceWord.word !== "133"
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      sequenceService.endpoints.getSequenceWords.matchFulfilled,
      (state, { payload }) => {
        state.sequenceWords = payload;
      }
    );

    builder.addMatcher(
      sequenceService.endpoints.getSequences.matchFulfilled,
      (state, { payload }) => {
        state.sequences = payload;
      }
    );
  },
});

export const { removeById } = sequenceSlice.actions;

export default sequenceSlice.reducer;
