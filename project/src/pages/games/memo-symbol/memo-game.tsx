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
import { keyboards } from "../../../components/keyboard/keyboard.info";

interface IFlagObj {
  [key: string]: boolean;
}

const gridStyles = {
  gridTemplateColumns: `repeat(8, 1fr)`,
  gap: "25px",
  margin: "40px 2vw",
};

const MemoSymbolGame = (): JSX.Element => {
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

  const language: TLanguage = useAppSelector(
    (state: RootState) => state.keyboardState?.language
  );

  const type: TCase = useAppSelector(
    (state: RootState) => state.keyboardState?.type
  );

  // blocking muiltiple keyondown keyup
  const flagObject: IFlagObj = {};

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(addKanjies(8));

    document.addEventListener("keydown", (event) => {
      if (!flagObject[event.code]) {
        const transferredLetter = flattedKeyboard.find(
          (elem) => elem.key === event.code
        )[language][type];
        console.log("language", language, "type", type);
        console.log("transferredLetter", transferredLetter);
        flagObject[event.code] = true;
        switch (event.code) {
          case "ShiftLeft":
          case "ShiftRight":
            dispatch(clickShift());
            break;
          case "CapsLock":
            clickCaps();
            break;
          case "AltLeft":
          case "AltRight":
            clickAlt();
            break;
          default:
            checkAnswer(event.code);
            break;
        }
      }
    });

    window.addEventListener("keyup", (event) => {
      flagObject[event.code] = false;

      switch (event.code) {
        case "ShiftLeft":
        case "ShiftRight":
          dispatch(clickShift());
          break;
        case "CapsLock":
          clickCaps();
          break;
        case "AltLeft":
        case "AltRight":
          clickAlt();
          break;
        default:
          break;
      }
    });
  }, []);

  function checkAnswer(value: string) {
    const transferredLetter = flattedKeyboard.find(
      (elem) => elem.key === value
    )[language][type];
    console.log("transferredLetter", transferredLetter);
    dispatch(buttonClick(transferredLetter));
  }

  // TODO 1.1 styles (background on wrong click and for guesses or correct positions for guesses )and adaptive
  // TODO 1.2 buttons logic kanji mode not hira-kata in future symbols
  // TODO 1.3 Row logic

  return (
    <div className="memoSymb">
      <div className="memoSymb__kangi">
        <div className="memoSymb__elem">{kanji}</div>
      </div>
      <div
        className="memoSymb__grid"
        style={letters.length > 10 ? gridStyles : {}}
      >
        {letters.map((letter, i) => (
          <Guess key={letter} letter={letter} kanji={kanjies[i]} />
        ))}
      </div>
      <Keyboard keyboard={keyboards} />
    </div>
  );
};

export default MemoSymbolGame;
