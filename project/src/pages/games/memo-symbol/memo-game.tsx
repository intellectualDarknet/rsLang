import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import "./memo-game.scss";

import Guess from "./components/guess";

import { AppDispatch, RootState, useAppSelector } from "../../../store/store";

import { Keyboard } from "../../../components/keyboard/keyboard";
import { useDispatch } from "react-redux";
import {
  TCase,
  TLanguage,
  addKanjies,
  buttonClick,
  clickAlt,
  clickCaps,
  clickShift,
} from "../../../store/keyboard-slice";

const keyboards = [
  [
    {
      key: "Backquote",
      ru: {
        lowercase: "ё",
        uppercase: "Ё",
        capsLowercase: "Ё",
        capsUppercase: "ё",
      },
      en: {
        lowercase: "`",
        uppercase: "~",
        capsLowercase: "`",
        capsUppercase: "~",
      },
    },
    {
      key: "Digit1",
      color: "#78e2aa",
      ru: {
        lowercase: "1",
        uppercase: "!",
        capsLowercase: "1",
        capsUppercase: "!",
      },
      en: {
        lowercase: "1",
        uppercase: "!",
        capsLowercase: "1",
        capsUppercase: "!",
      },
    },
    {
      key: "Digit2",
      color: "#78e2aa",
      ru: {
        lowercase: "2",
        uppercase: '"',
        capsLowercase: "2",
        capsUppercase: '"',
      },
      en: {
        lowercase: "2",
        uppercase: "@",
        capsLowercase: "2",
        capsUppercase: "@",
      },
    },
    {
      key: "Digit3",
      color: "#63e3ff",
      ru: {
        lowercase: "3",
        uppercase: "№",
        capsLowercase: "3",
        capsUppercase: "№",
      },
      en: {
        lowercase: "3",
        uppercase: "#",
        capsLowercase: "3",
        capsUppercase: "#",
      },
    },
    {
      key: "Digit4",
      color: "#f69ec4",
      ru: {
        lowercase: "4",
        uppercase: ";",
        capsLowercase: "4",
        capsUppercase: ";",
      },
      en: {
        lowercase: "4",
        uppercase: "$",
        capsLowercase: "4",
        capsUppercase: "$",
      },
    },
    {
      key: "Digit5",
      color: "#ffc07e",
      ru: {
        lowercase: "5",
        uppercase: "%",
        capsLowercase: "5",
        capsUppercase: "%",
      },
      en: {
        lowercase: "5",
        uppercase: "%",
        capsLowercase: "5",
        capsUppercase: "%",
      },
    },
    {
      key: "Digit6",
      color: "#ffc07e",
      ru: {
        lowercase: "6",
        uppercase: ":",
        capsLowercase: "6",
        capsUppercase: ":",
      },
      en: {
        lowercase: "6",
        uppercase: "^",
        capsLowercase: "6",
        capsUppercase: "^",
      },
    },
    {
      key: "Digit7",
      color: "#ffef7e",
      ru: {
        lowercase: "7",
        uppercase: "?",
        capsLowercase: "7",
        capsUppercase: "?",
      },
      en: {
        lowercase: "7",
        uppercase: "&",
        capsLowercase: "7",
        capsUppercase: "&",
      },
    },
    {
      key: "Digit8",
      color: "#f69ec4",
      ru: {
        lowercase: "8",
        uppercase: "*",
        capsLowercase: "8",
        capsUppercase: "*",
      },
      en: {
        lowercase: "8",
        uppercase: "*",
        capsLowercase: "8",
        capsUppercase: "*",
      },
    },
    {
      key: "Digit9",
      color: "#63e3ff",
      ru: {
        lowercase: "9",
        uppercase: "(",
        capsLowercase: "9",
        capsUppercase: "(",
      },
      en: {
        lowercase: "9",
        uppercase: "(",
        capsLowercase: "9",
        capsUppercase: "(",
      },
    },
    {
      key: "Digit0",
      color: "#78e2aa",
      ru: {
        lowercase: "0",
        uppercase: ")",
        capsLowercase: "0",
        capsUppercase: ")",
      },
      en: {
        lowercase: "0",
        uppercase: ")",
        capsLowercase: "0",
        capsUppercase: ")",
      },
    },
    {
      key: "Minus",
      color: "#78e2aa",
      ru: {
        lowercase: "-",
        uppercase: "_",
        capsLowercase: "-",
        capsUppercase: "_",
      },
      en: {
        lowercase: "-",
        uppercase: "_",
        capsLowercase: "-",
        capsUppercase: "_",
      },
    },
    {
      key: "Equal",
      color: "#78e2aa",
      ru: {
        lowercase: "=",
        uppercase: "+",
        capsLowercase: "=",
        capsUppercase: "+",
      },
      en: {
        lowercase: "=",
        uppercase: "+",
        capsLowercase: "=",
        capsUppercase: "+",
      },
    },
    {
      key: "Backspace",
      ru: {
        lowercase: "backspace",
        uppercase: "backspace",
        capsLowercase: "backspace",
        capsUppercase: "backspace",
      },
      en: {
        lowercase: "backspace",
        uppercase: "backspace",
        capsLowercase: "backspace",
        capsUppercase: "backspace",
      },
      customClass: "backspace",
    },
    {
      key: "Delete",
      ru: {
        lowercase: "del",
        uppercase: "del",
        capsLowercase: "del",
        capsUppercase: "del",
      },
      en: {
        lowercase: "del",
        uppercase: "del",
        capsLowercase: "del",
        capsUppercase: "del",
      },
      customClass: "del",
    },
  ],
  [
    {
      key: "Tab",
      ru: {
        lowercase: "tab",
        uppercase: "tab",
        capsLowercase: "tab",
        capsUppercase: "tab",
      },
      en: {
        lowercase: "tab",
        uppercase: "tab",
        capsLowercase: "tab",
        capsUppercase: "tab",
      },
      customClass: "tab",
    },
    {
      key: "KeyQ",
      color: "#78e2aa",
      ru: {
        lowercase: "й",
        uppercase: "Й",
        capsLowercase: "Й",
        capsUppercase: "й",
      },
      en: {
        lowercase: "q",
        uppercase: "Q",
        capsLowercase: "Q",
        capsUppercase: "q",
      },
    },
    {
      key: "KeyW",
      color: "#63e3ff",
      ru: {
        lowercase: "ц",
        uppercase: "Ц",
        capsLowercase: "Ц",
        capsUppercase: "ц",
      },
      en: {
        lowercase: "w",
        uppercase: "W",
        capsLowercase: "W",
        capsUppercase: "w",
      },
    },
    {
      key: "KeyE",
      color: "#f69ec4",
      ru: {
        lowercase: "у",
        uppercase: "У",
        capsLowercase: "У",
        capsUppercase: "у",
      },
      en: {
        lowercase: "e",
        uppercase: "E",
        capsLowercase: "E",
        capsUppercase: "e",
      },
    },
    {
      key: "KeyR",
      color: "#ffc07e",
      ru: {
        lowercase: "к",
        uppercase: "К",
        capsLowercase: "К",
        capsUppercase: "к",
      },
      en: {
        lowercase: "r",
        uppercase: "R",
        capsLowercase: "R",
        capsUppercase: "r",
      },
    },
    {
      key: "KeyT",
      color: "#ffc07e",
      ru: {
        lowercase: "е",
        uppercase: "Е",
        capsLowercase: "Е",
        capsUppercase: "е",
      },
      en: {
        lowercase: "t",
        uppercase: "T",
        capsLowercase: "T",
        capsUppercase: "t",
      },
    },
    {
      key: "KeyY",
      color: "#ffef7e",
      ru: {
        lowercase: "н",
        uppercase: "Н",
        capsLowercase: "Н",
        capsUppercase: "н",
      },
      en: {
        lowercase: "y",
        uppercase: "Y",
        capsLowercase: "Y",
        capsUppercase: "y",
      },
    },
    {
      key: "KeyU",
      color: "#ffef7e",
      ru: {
        lowercase: "г",
        uppercase: "Г",
        capsLowercase: "Г",
        capsUppercase: "г",
      },
      en: {
        lowercase: "u",
        uppercase: "U",
        capsLowercase: "U",
        capsUppercase: "u",
      },
    },
    {
      key: "KeyI",
      ru: {
        lowercase: "ш",
        uppercase: "Ш",
        capsLowercase: "Ш",
        capsUppercase: "ш",
      },
      en: {
        lowercase: "i",
        uppercase: "I",
        capsLowercase: "I",
        capsUppercase: "i",
      },
    },
    {
      key: "KeyO",
      color: "#63e3ff",
      ru: {
        lowercase: "щ",
        uppercase: "Щ",
        capsLowercase: "Щ",
        capsUppercase: "щ",
      },
      en: {
        lowercase: "o",
        uppercase: "O",
        capsLowercase: "O",
        capsUppercase: "o",
      },
    },
    {
      key: "KeyP",
      ru: {
        lowercase: "з",
        uppercase: "З",
        capsLowercase: "З",
        capsUppercase: "з",
      },
      en: {
        lowercase: "p",
        uppercase: "P",
        capsLowercase: "P",
        capsUppercase: "p",
      },
    },
    {
      key: "BracketLeft",
      ru: {
        lowercase: "х",
        uppercase: "Х",
        capsLowercase: "Х",
        capsUppercase: "х",
      },
      en: {
        lowercase: "[",
        uppercase: "{",
        capsLowercase: "[",
        capsUppercase: "{",
      },
    },
    {
      key: "BracketRight",
      ru: {
        lowercase: "ъ",
        uppercase: "Ъ",
        capsLowercase: "Ъ",
        capsUppercase: "ъ",
      },
      en: {
        lowercase: "]",
        uppercase: "}",
        capsLowercase: "]",
        capsUppercase: "}",
      },
    },
    {
      key: "Backslash",
      ru: {
        lowercase: "\\",
        uppercase: "|",
        capsLowercase: "\\",
        capsUppercase: "|",
      },
      en: {
        lowercase: "\\",
        uppercase: "|",
        capsLowercase: "\\",
        capsUppercase: "|",
      },
      customClass: "backslash",
    },
  ],
  [
    {
      key: "CapsLock",
      ru: {
        lowercase: "capslock",
        uppercase: "capslock",
        capsLowercase: "capslock",
        capsUppercase: "capslock",
      },
      en: {
        lowercase: "capslock",
        uppercase: "capslock",
        capsLowercase: "capslock",
        capsUppercase: "capslock",
      },

      customClass: "caps-lock",
    },
    {
      key: "KeyA",
      color: "#78e2aa",
      ru: {
        lowercase: "ф",
        uppercase: "Ф",
        capsLowercase: "Ф",
        capsUppercase: "ф",
      },
      en: {
        lowercase: "a",
        uppercase: "A",
        capsLowercase: "A",
        capsUppercase: "a",
      },
    },
    {
      key: "KeyS",
      color: "#63e3ff",
      ru: {
        lowercase: "ы",
        uppercase: "Ы",
        capsLowercase: "Ы",
        capsUppercase: "ы",
      },
      en: {
        lowercase: "s",
        uppercase: "S",
        capsLowercase: "S",
        capsUppercase: "s",
      },
    },
    {
      key: "KeyD",
      color: "#f69ec4",
      ru: {
        lowercase: "в",
        uppercase: "В",
        capsLowercase: "В",
        capsUppercase: "в",
      },
      en: {
        lowercase: "d",
        uppercase: "D",
        capsLowercase: "D",
        capsUppercase: "d",
      },
    },
    {
      key: "KeyF",
      color: "#ffc07e",
      ru: {
        lowercase: "а",
        uppercase: "А",
        capsLowercase: "А",
        capsUppercase: "а",
      },
      en: {
        lowercase: "f",
        uppercase: "F",
        capsLowercase: "F",
        capsUppercase: "f",
      },
    },
    {
      key: "KeyG",
      color: "#ffc07e",
      ru: {
        lowercase: "п",
        uppercase: "П",
        capsLowercase: "П",
        capsUppercase: "п",
      },
      en: {
        lowercase: "g",
        uppercase: "G",
        capsLowercase: "G",
        capsUppercase: "g",
      },
    },
    {
      key: "KeyH",
      color: "#ffef7e",
      ru: {
        lowercase: "р",
        uppercase: "Р",
        capsLowercase: "Р",
        capsUppercase: "р",
      },
      en: {
        lowercase: "h",
        uppercase: "H",
        capsLowercase: "H",
        capsUppercase: "h",
      },
    },
    {
      key: "KeyJ",
      color: "#ffef7e",
      ru: {
        lowercase: "о",
        uppercase: "О",
        capsLowercase: "О",
        capsUppercase: "о",
      },
      en: {
        lowercase: "j",
        uppercase: "J",
        capsLowercase: "J",
        capsUppercase: "j",
      },
    },
    {
      key: "KeyK",
      ru: {
        lowercase: "л",
        uppercase: "Л",
        capsLowercase: "Л",
        capsUppercase: "л",
      },
      en: {
        lowercase: "k",
        uppercase: "K",
        capsLowercase: "K",
        capsUppercase: "k",
      },
    },
    {
      key: "KeyL",
      color: "#63e3ff",
      ru: {
        lowercase: "д",
        uppercase: "Д",
        capsLowercase: "Д",
        capsUppercase: "д",
      },
      en: {
        lowercase: "l",
        uppercase: "L",
        capsLowercase: "L",
        capsUppercase: "l",
      },
    },
    {
      key: "Semicolon",
      color: "#78e2aa",
      ru: {
        lowercase: "ж",
        uppercase: "Ж",
        capsLowercase: "Ж",
        capsUppercase: "ж",
      },
      en: {
        lowercase: ";",
        uppercase: ":",
        capsLowercase: ";",
        capsUppercase: ":",
      },
    },
    {
      key: "Quote",
      ru: {
        lowercase: "э",
        uppercase: "Э",
        capsLowercase: "Э",
        capsUppercase: "э",
      },
    },
    {
      key: "Enter",
      ru: {
        lowercase: "enter",
        uppercase: "enter",
        capsLowercase: "enter",
        capsUppercase: "enter",
      },
      en: {
        lowercase: "enter",
        uppercase: "enter",
        capsLowercase: "enter",
        capsUppercase: "enter",
      },
      customClass: "enter",
    },
  ],
  [
    {
      key: "ShiftLeft",
      ru: {
        lowercase: "shift",
        uppercase: "shift",
        capsLowercase: "shift",
        capsUppercase: "shift",
      },
      en: {
        lowercase: "shift",
        uppercase: "shift",
        capsLowercase: "shift",
        capsUppercase: "shift",
      },
      customClass: "shift-left",
    },
    {
      key: "KeyZ",
      color: "#78e2aa",
      ru: {
        lowercase: "я",
        uppercase: "Я",
        capsLowercase: "Я",
        capsUppercase: "я",
      },
      en: {
        lowercase: "z",
        uppercase: "Z",
        capsLowercase: "Z",
        capsUppercase: "z",
      },
    },
    {
      key: "KeyX",
      color: "#63e3ff",
      ru: {
        lowercase: "ч",
        uppercase: "Ч",
        capsLowercase: "Ч",
        capsUppercase: "ч",
      },
      en: {
        lowercase: "x",
        uppercase: "X",
        capsLowercase: "X",
        capsUppercase: "x",
      },
    },
    {
      key: "KeyC",
      color: "#f69ec4",
      ru: {
        lowercase: "с",
        uppercase: "С",
        capsLowercase: "С",
        capsUppercase: "с",
      },
      en: {
        lowercase: "c",
        uppercase: "C",
        capsLowercase: "C",
        capsUppercase: "c",
      },
    },
    {
      key: "KeyV",
      color: "#ffc07e",
      ru: {
        lowercase: "м",
        uppercase: "М",
        capsLowercase: "М",
        capsUppercase: "м",
      },
      en: {
        lowercase: "v",
        uppercase: "V",
        capsLowercase: "V",
        capsUppercase: "v",
      },
    },
    {
      key: "KeyB",
      color: "#ffc07e",
      ru: {
        lowercase: "и",
        uppercase: "И",
        capsLowercase: "И",
        capsUppercase: "и",
      },
      en: {
        lowercase: "b",
        uppercase: "B",
        capsLowercase: "B",
        capsUppercase: "b",
      },
    },
    {
      key: "KeyN",
      color: "#ffef7e",
      ru: {
        lowercase: "т",
        uppercase: "Т",
        capsLowercase: "Т",
        capsUppercase: "т",
      },
      en: {
        lowercase: "n",
        uppercase: "N",
        capsLowercase: "N",
        capsUppercase: "n",
      },
    },
    {
      key: "KeyM",
      color: "#ffef7e",
      ru: {
        lowercase: "ь",
        uppercase: "Ь",
        capsLowercase: "Ь",
        capsUppercase: "ь",
      },
      en: {
        lowercase: "m",
        uppercase: "M",
        capsLowercase: "M",
        capsUppercase: "m",
      },
    },
    {
      key: "Comma",
      ru: {
        lowercase: "б",
        uppercase: "Б",
        capsLowercase: "Б",
        capsUppercase: "б",
      },
      en: {
        lowercase: ",",
        uppercase: "<",
        capsLowercase: ",",
        capsUppercase: "<",
      },
    },
    {
      key: "Period",
      ru: {
        lowercase: "ю",
        uppercase: "Ю",
        capsLowercase: "Ю",
        capsUppercase: "ю",
      },
      en: {
        lowercase: ".",
        uppercase: ">",
        capsLowercase: ".",
        capsUppercase: ">",
      },
    },
    {
      key: "Slash",
      color: "#78e2aa",
      ru: {
        lowercase: ".",
        uppercase: ",",
        capsLowercase: ".",
        capsUppercase: ",",
      },
      en: {
        lowercase: "/",
        uppercase: "?",
        capsLowercase: "/",
        capsUppercase: "?",
      },
    },
    {
      key: "ShiftRight",
      ru: {
        lowercase: "shift",
        uppercase: "shift",
        capsLowercase: "shift",
        capsUppercase: "shift",
      },
      en: {
        lowercase: "shift",
        uppercase: "shift",
        capsLowercase: "shift",
        capsUppercase: "shift",
      },
      customClass: "shift-right",
    },
    {
      key: "ArrowUp",
      ru: {
        lowercase: "&uarr;",
        uppercase: "&uarr;",
        capsLowercase: "&uarr;",
        capsUppercase: "&uarr;",
      },
      en: {
        lowercase: "&uarr;",
        uppercase: "&uarr;",
        capsLowercase: "&uarr;",
        capsUppercase: "&uarr;",
      },
      customClass: "arrow-up",
    },
  ],
  [
    {
      key: "ControlLeft",
      ru: {
        lowercase: "ctrl",
        uppercase: "ctrl",
        capsLowercase: "ctrl",
        capsUppercase: "ctrl",
      },
      en: {
        lowercase: "ctrl",
        uppercase: "ctrl",
        capsLowercase: "ctrl",
        capsUppercase: "ctrl",
      },
      customClass: "ctrl",
    },
    {
      key: "MetaLeft",
      ru: {
        lowercase: "win",
        uppercase: "win",
        capsLowercase: "win",
        capsUppercase: "win",
      },
      en: {
        lowercase: "win",
        uppercase: "win",
        capsLowercase: "win",
        capsUppercase: "win",
      },
      customClass: "win",
    },
    {
      key: "AltLeft",
      ru: {
        lowercase: "alt",
        uppercase: "alt",
        capsLowercase: "alt",
        capsUppercase: "alt",
      },
      en: {
        lowercase: "alt",
        uppercase: "alt",
        capsLowercase: "alt",
        capsUppercase: "alt",
      },
      customClass: "alt",
    },
    {
      key: "Space",
      ru: {
        lowercase: "space",
        uppercase: "space",
        capsLowercase: "space",
        capsUppercase: "space",
      },
      en: {
        lowercase: "space",
        uppercase: "space",
        capsLowercase: "space",
        capsUppercase: "space",
      },
      customClass: "space",
    },
    {
      key: "AltRight",
      ru: {
        lowercase: "alt",
        uppercase: "alt",
        capsLowercase: "alt",
        capsUppercase: "alt",
      },
      en: {
        lowercase: "alt",
        uppercase: "alt",
        capsLowercase: "alt",
        capsUppercase: "alt",
      },
      customClass: "alt",
    },
    {
      key: "MetaRight",
      ru: {
        lowercase: "win",
        uppercase: "win",
        capsLowercase: "win",
        capsUppercase: "win",
      },
      en: {
        lowercase: "win",
        uppercase: "win",
        capsLowercase: "win",
        capsUppercase: "win",
      },
      customClass: "win",
    },
    {
      key: "ControlRight",
      ru: {
        lowercase: "ctrl",
        uppercase: "ctrl",
        capsLowercase: "ctrl",
        capsUppercase: "ctrl",
      },
      en: {
        lowercase: "ctrl",
        uppercase: "ctrl",
        capsLowercase: "ctrl",
        capsUppercase: "ctrl",
      },
      customClass: "ctrl",
    },

    {
      key: "ArrowLeft",
      ru: {
        lowercase: "&larr;",
        uppercase: "&larr;",
        capsLowercase: "&larr;",
        capsUppercase: "&larr;",
      },
      en: {
        lowercase: "&larr;",
        uppercase: "&larr;",
        capsLowercase: "&larr;",
        capsUppercase: "&larr;",
      },
      customClass: "arrow-left",
    },

    {
      key: "ArrowDown",
      ru: {
        lowercase: "&darr;",
        uppercase: "&darr;",
        capsLowercase: "&darr;",
        capsUppercase: "&darr;",
      },
      en: {
        lowercase: "&darr;",
        uppercase: "&darr;",
        capsLowercase: "&darr;",
        capsUppercase: "&darr;",
      },
      customClass: "arrow-down",
    },

    {
      key: "ArrowRight",
      ru: {
        lowercase: "&rarr;",
        uppercase: "&rarr;",
        capsLowercase: "&rarr;",
        capsUppercase: "&rarr;",
      },
      en: {
        lowercase: "&rarr;",
        uppercase: "&rarr;",
        capsLowercase: "&rarr;",
        capsUppercase: "&rarr;",
      },
      customClass: "arrow-right",
    },
  ],
];

interface IFlagObj {
  [key: string]: boolean;
}

const MemoSymbolGame = (): JSX.Element => {
  const userId: string = useAppSelector(
    (state: RootState) => state.authState.auth?.userId
  );

  const flattedKeyboard = keyboards.flat();

  const kanji: string = useAppSelector(
    (state: RootState) => state.keyboardState.kanji
  );

  const kanjies: string[] = useAppSelector(
    (state: RootState) => state.keyboardState.kanjies
  );

  const letters: string[] = useAppSelector(
    (state: RootState) => state.keyboardState.keyboardLetters
  );

  const expectedLetter: string = useAppSelector(
    (state: RootState) => state.keyboardState?.expectedLetter
  );

  const language: TLanguage = useAppSelector(
    (state: RootState) => state.keyboardState?.language
  );

  const type: TCase = useAppSelector(
    (state: RootState) => state.keyboardState?.type
  );

  const flagObject: IFlagObj = {};

  const row: number = useAppSelector(
    (state: RootState) => state.keyboardState.row
  );

  // const [single, setSingle] = useState(0);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(addKanjies(8));
    // setSingle(8);

    document.addEventListener("keydown", (event) => {
      console.log("keydown event", Date.now(), event);
      if (!flagObject[event.code]) {
        flagObject[event.code] = true;
        switch (event.code) {
          case "ShiftLeft":
          case "ShiftRight":
            clickShift();
            break;
          case "CapsLock":
            clickCaps();
            break;
          case "AltLeft":
          case "AltRight":
            clickAlt();
            break;
          case "ControlLeft":
          case "ControlRight":
          case "MetaLeft":
          case "MetaRight":
            break;
          default:
            checkAnswer(event.code);
            break;
        }
      }
    });

    window.addEventListener("keyup", (event) => {
      flagObject[event.code] = false;
    });
  }, []);

  function checkAnswer(value: string) {
    const transferredLetter = flattedKeyboard.find(
      (elem) => elem.key === value
    )[language][type];
    dispatch(buttonClick(transferredLetter));
  }

  return (
    <div className="memoSymb">
      <div className="memoSymb__kangi">
        <div className="memoSymb__elem">{kanji}</div>
      </div>
      <div className="memoSymb__grid">
        {letters.map((letter, i) => (
          <Guess key={letter} letter={letter} kanji={kanjies[i]} />
        ))}
      </div>
      <Keyboard keyboard={keyboards} />
    </div>
  );
};

export default MemoSymbolGame;
