import { createSlice } from "@reduxjs/toolkit";

export interface IHiraKata {
  answersArray: string[];
  expectedKanji: string;
  expectedAnswer: string;
}

interface INext {
  expectedKanji: string;
  expectedAnswer: string;
}

const initialState: IHiraKata = {
  answersArray: [],
  expectedKanji: "1",
  expectedAnswer: "1",
};

export const HiraganaSlice = createSlice({
  name: "hiragana",
  initialState: initialState,
  reducers: {
    addAnswerInArray: (state, { payload }: { payload: string }) => {
      state.answersArray = [...state.answersArray, payload];
      console.log(state.answersArray);
    },

    deleteAnswerFromArray: (state, { payload }: { payload: string }) => {
      console.log(state.answersArray);
      state.answersArray = state.answersArray.filter((elem) => elem != payload);
      console.log(state.answersArray);
    },

    nextKanji: (state, { payload }: { payload: INext }) => {
      state.expectedKanji = payload.expectedKanji;
      state.expectedAnswer = payload.expectedAnswer;
    },
  },
});

export const { addAnswerInArray, deleteAnswerFromArray, nextKanji } =
  HiraganaSlice.actions;

export default HiraganaSlice.reducer;
