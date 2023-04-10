import { createSlice } from "@reduxjs/toolkit";

export type TLanguage = "en" | "ru";
export type TCase =
  | "lowercase"
  | "uppercase"
  | "capsLowercase"
  | "capsUppercase";
export type TShift = true | false;
export type TCaps = true | false;

export interface KeyboardState {
  index: number;
  row: number;
  language: TLanguage;
  type: TCase;
  shift: TShift;
  capslock: TCaps;
  clickedLetter: string;
  expectedLetter: string;

  roundAnswers: number;
  roundCurrectAnswers: number;

  kanjies: string[];
  keyboardLetters: string[];
  lettersClicked: string[];
  alt: boolean;
  kanji: string;
  mistakeInLetter: string;
}

const initialState: KeyboardState = {
  index: 0,
  row: 0,
  language: "en",
  type: "lowercase",
  shift: false,
  capslock: false,
  alt: false,

  roundAnswers: 0,
  roundCurrectAnswers: 0,

  clickedLetter: "",
  expectedLetter: "",
  kanjies: [],
  keyboardLetters: [],
  lettersClicked: [],
  kanji: "",
  mistakeInLetter: "",
};

const orderredLetters = [
  "a",
  "s",
  "d",
  "f",
  "j",
  "k",
  "l",
  ";",
  "g",
  "h",
  "t",
  "y",
  "b",
  "n",
  "r",
  "u",
  "e",
  "i",
  "w",
  "o",
  "q",
  "p",
  "b",
  "n",
  "v",
  "m",
];

function defineCases(state: KeyboardState) {
  // checkout mb with caps they are different but who knows

  switch (+state.shift + +state.capslock) {
    case 2:
      state.type = "lowercase";
      break;
    case 1:
      state.type = "uppercase";
      break;
    case 0:
      state.type = "lowercase";
      break;
    default:
      break;
  }
}
function randomize(state: KeyboardState) {
  const index = Math.round(Math.random() * (state.keyboardLetters.length - 1));
  console.log("index", index);
  state.expectedLetter = state.keyboardLetters[index];
  console.log("expected", state.keyboardLetters[index]);
  state.kanji = state.kanjies[index];
  console.log("kanji", state.kanji);
}

function addkanjiesFunction(state: KeyboardState, payload: any) {
  const newkanjiArray: string[] = [];
  let newValue: string;
  new Array(payload).fill(2).forEach((elem) => {
    while (newkanjiArray.length < payload) {
      newValue = String.fromCharCode(
        // hira kata if you are want to go easy on you
        Math.round((12543 - 12448) * Math.random() + 12448)
      );
      // newValue = String.fromCharCode(
      //   Math.round((40879 - 19968) * Math.random() + 19968)
      // );
      if (
        !state.kanjies.includes(newValue) &&
        !newkanjiArray.includes(newValue)
      )
        newkanjiArray.push(newValue);
    }
  });
  state.kanjies = [...state.kanjies, ...newkanjiArray];
  state.index = state.index + payload;
  state.keyboardLetters = orderredLetters.slice(0, state.index);
  console.log(state.keyboardLetters);
  randomize(state);
  changeKanji();
}

export const keyboardSlice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    buttonClick: (state, { payload }: { payload: string }) => {
      state.clickedLetter = payload;
      state.roundAnswers = state.roundAnswers + 1;
      // check logic once again
      if (
        !state.lettersClicked.includes(payload) &&
        state.expectedLetter == state.clickedLetter
      )
        state.lettersClicked = [...state.lettersClicked, payload];
      if (state.expectedLetter == state.clickedLetter) {
        state.row = state.row + 1;
        state.roundCurrectAnswers = state.roundCurrectAnswers + 1;
        state.mistakeInLetter = "";
        randomize(state);
      } else {
        state.mistakeInLetter = payload;
        state.row = 0;
      }

      if (
        state.roundCurrectAnswers / state.keyboardLetters.length > 1 &&
        state.roundCurrectAnswers / state.roundAnswers > 0.8
      ) {
        console.log("next round event");
        state.roundAnswers = 0;
        state.roundCurrectAnswers = 0;
        addkanjiesFunction(state, 2);
      }
    },

    changeExpectedLetter: (state, { payload }: { payload: string }) => {
      state.expectedLetter = payload;
    },

    addKanjies: (state, { payload }: { payload: number }) => {
      addkanjiesFunction(state, payload);
      console.log("add kanjies");
    },

    changeKanji: (state) => {
      state.kanji =
        state.kanjies[Math.round(Math.random() * state.kanjies.length)];
    },

    clickShift: (state) => {
      state.shift = !state.shift;
      defineCases(state);
    },

    clickCaps: (state) => {
      state.capslock = !state.capslock;
      defineCases(state);
    },

    clickAlt: (state) => {
      state.alt = !state.alt;
      defineCases(state);
    },

    changeLanguage: (state) => {
      state.language = state.language === "en" ? "ru" : "en";
      defineCases(state);
    },
  },
});

export const {
  buttonClick,
  clickShift,
  clickCaps,
  changeLanguage,
  addKanjies,
  changeKanji,
  clickAlt,
} = keyboardSlice.actions;

export default keyboardSlice.reducer;
