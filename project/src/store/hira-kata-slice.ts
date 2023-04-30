import { createSlice } from "@reduxjs/toolkit";
import { keyboards } from "../components/keyboard/keyboard.info";

export interface IHiraKata {
  mistakesArray: string[];
  expectedKanji: string;
  expectedAnswer: string;
  answer: string;
}

interface INext {
  expectedKanji: string;
  expectedAnswer: string;
}

const initialState: IHiraKata = {
  mistakesArray: [
    "а",
    "ка",
    "са",
    "та",
    "на",
    "ха",
    "ма",
    "ра",
    "ва",
    "и",
    "ки",
    "си",
    "ти",
    "ни",
    "хи",
    "ми",
    "ри",
    "у",
    "ку",
    "су",
    "цу",
    "ну",
    "фу",
    "му",
    "ру",
    "ю",
    "э",
    "кэ",
    "сэ",
    "тэ",
    "нэ",
    "хэ",
    "мэ",
    "рэ",
    "во",
    "о",
    "ко",
    "со",
    "то",
    "но",
    "хо",
    "мо",
    "ро",
    "я",
    "ё",
    "га",
    "дза",
    "да",
    "ба",
    "па",
    "ги",
    "дзи",
    "би",
    "пи",
    "гу",
    "дзу",
    "бу",
    "пу",
    "гэ",
    "дзэ",
    "бэ",
    "пэ",
    "го",
    "дзо",
    "бо",
    "по",
  ],
  expectedKanji: "あ",
  expectedAnswer: "а",
  answer: "",
};

export const HiraganaSlice = createSlice({
  name: "hiragana",
  initialState: initialState,
  reducers: {
    addMistakeInArray: (state, { payload }: { payload: string }) => {
      state.mistakesArray.push(payload);
    },

    deleteMistakeFromArray: (state, { payload }: { payload: string }) => {
      state.mistakesArray.filter((elem) => elem === payload);
    },

    nextKanji: (state, { payload }: { payload: INext }) => {
      state.expectedKanji = payload.expectedKanji;
      state.expectedAnswer = payload.expectedAnswer;
    },

    changeAnswer: (state, { payload }: { payload: string }) => {
      state.answer = state.answer + payload;
    },

    nullifyAnswer: (state) => {
      state.answer = "";
    },

    backSpace: (state) => {
      state.answer.length
        ? (state.answer = state.answer.slice(0, state.answer.length - 1))
        : null;
    },
  },
});

export const {
  addMistakeInArray,
  deleteMistakeFromArray,
  nextKanji,
  changeAnswer,
  nullifyAnswer,
  backSpace,
} = HiraganaSlice.actions;

export default HiraganaSlice.reducer;
