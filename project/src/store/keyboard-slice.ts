import { createSlice } from "@reduxjs/toolkit";
import { keyboards } from "../components/keyboard/keyboard.info";

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
  level: number;
  points: number;

  language: TLanguage;
  type: TCase;
  capslock: boolean;
  shift: boolean;
  alt: boolean;

  clickedLetter: string;
  expectedLetter: string;
  mistakeInLetter: string;

  kanjies: string[];
  keyboardLetters: string[];
  lettersClicked: string[];
  kanjiesToCheck: string[];
  kanji: string;
}

const flattedKeyboard: any[] = keyboards.flat();

function shiftChangeType(value: string) {
  switch (value) {
    case "lowercase":
      return "uppercase";
      break;
    case "uppercase":
      return "lowercase";
      break;
    case "capsLowercase":
      return "capsUppercase";
      break;
    case "capsUppercase":
      return "capsLowercase";
      break;
  }
}

function calculatePoins(points: number, row: number) {
  return points + 23 * row + 85;
}

function capsChangeType(value: string) {
  switch (value) {
    case "lowercase":
      return "capsUppercase";
      break;
    case "uppercase":
      return "capsLowercase";
      break;
    case "capsLowercase":
      return "uppercase";
      break;
    case "capsUppercase":
      return "lowercase";
      break;
  }
}

const initialState: KeyboardState = {
  index: 0,
  row: 0,
  level: 1,
  points: 0,

  language: "en",
  type: "lowercase",
  shift: false,
  capslock: false,
  alt: false,

  keyboardLetters: [],
  lettersClicked: [],
  kanjiesToCheck: [],
  kanjies: [],
  kanji: "",

  expectedLetter: "",
  clickedLetter: "",
  mistakeInLetter: "",
};

const orderredLetters = [
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  ";",
  //
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  //
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  ",",
  ".",
  //
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  //

  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  ":",
  //
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  //
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
];

function GatherKanjiesToCheck(state: KeyboardState) {
  const kanjiesToCheck: string[] = [];

  while (kanjiesToCheck.length < 0.8 * state.kanjies.length) {
    const index = Math.round(Math.random() * (state.kanjies.length - 1));
    if (!kanjiesToCheck.includes(state.kanjies[index])) {
      kanjiesToCheck.push(state.kanjies[index]);
    }
  }

  console.log("first kanjies", kanjiesToCheck);

  while (kanjiesToCheck.length != state.kanjies.length) {
    const index = Math.round(Math.random() * (state.kanjies.length - 1));
    kanjiesToCheck.push(state.kanjies[index]);
  }

  console.log("first kanjies", kanjiesToCheck);
  state.kanjiesToCheck = kanjiesToCheck;
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
        !(state.kanjies.includes(newValue) || newkanjiArray.includes(newValue))
      )
        newkanjiArray.push(newValue);
    }
  });
  state.kanjies = [...state.kanjies, ...newkanjiArray];
  state.keyboardLetters = orderredLetters.slice(0, state.kanjies.length);
  GatherKanjiesToCheck(state);
  state.expectedLetter =
    state.keyboardLetters[
      state.kanjies.indexOf(state.kanjiesToCheck[state.index])
    ];
}

export const keyboardSlice = createSlice({
  name: "keyboard",
  initialState: initialState,
  reducers: {
    buttonClick: (state, { payload }: { payload: string }) => {
      const transferredLetter = flattedKeyboard.find(
        (elem) => elem.key === payload
      )[state.language][state.type];
      console.log("transferredLetter", transferredLetter);
      console.log("expectedLetter", state.expectedLetter);
      console.log("mistakeinLetter", state.mistakeInLetter);
      state.clickedLetter = transferredLetter;
      if (
        !state.lettersClicked.includes(transferredLetter) &&
        state.expectedLetter == state.clickedLetter
      )
        state.lettersClicked = [...state.lettersClicked, transferredLetter];
      if (state.expectedLetter == state.clickedLetter) {
        state.row = state.row + 1;
        state.index = state.index + 1;
        state.mistakeInLetter = "";
        state.kanji = state.kanjiesToCheck[state.index];
        state.expectedLetter =
          state.keyboardLetters[
            state.kanjies.indexOf(state.kanjiesToCheck[state.index])
          ];
        state.points = calculatePoins(state.points, state.row);
      } else {
        state.mistakeInLetter = transferredLetter;
        state.row = 0;
      }

      console.log("points", state.points, "level", state.kanjies.length * 100);

      if (state.points > state.kanjies.length * 100) {
        state.level = ++state.level;
        state.index = 0;
        state.points = 0;
        addkanjiesFunction(state, 2);
        state.kanji = state.kanjiesToCheck[state.index];
        console.log("updated level", state);
      }
    },

    changeExpectedLetter: (state, { payload }: { payload: string }) => {
      state.expectedLetter = payload;
    },

    addKanjies: (state, { payload }: { payload: number }) => {
      addkanjiesFunction(state, payload);
      state.kanji = state.kanjiesToCheck[state.index];
    },

    changeKanji: (state) => {
      state.kanjies[Math.round(Math.random() * state.kanjies.length)];
    },

    clickShift: (state, { payload }: { payload: boolean }) => {
      state.shift = payload;
      console.log(state.shift, state.alt);
      if (state.shift && state.alt) {
        state.language === "en"
          ? (state.language = "ru")
          : (state.language = "en");
      } else {
        state.type = shiftChangeType(state.type);
      }
    },

    clickCaps: (state, { payload }: { payload: boolean }) => {
      state.capslock = payload;
      console.log(state.shift, state.alt);
      state.type = capsChangeType(state.type);
    },

    clickAlt: (state, { payload }: { payload: boolean }) => {
      state.alt = payload;
      console.log(state.shift, state.alt);
      if (state.alt && state.shift) {
        state.language === "en"
          ? (state.language = "ru")
          : (state.language = "en");
      }
    },
  },
});

export const {
  buttonClick,
  clickShift,
  clickCaps,
  addKanjies,
  changeKanji,
  clickAlt,
} = keyboardSlice.actions;

export default keyboardSlice.reducer;
