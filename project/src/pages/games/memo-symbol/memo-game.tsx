import React, { useEffect } from "react";
import "./memo-game.scss";

import Guess from "./components/guess";

import { useDispatch } from "react-redux";
import {
  addKanjies,
  buttonClick,
  clickAlt,
  clickCaps,
  clickShift,
} from "../../../store/keyboard-slice";

import {
  AppDispatch,
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";

import { Keyboard } from "../../../components/keyboard/keyboard";

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
  const dispatch = useAppDispatch();

  const { kanji, kanjies, keyboardLetters, language, type } = useAppSelector(
    (state: RootState) => state.keyboardState
  );

  const flagObject: IFlagObj = {};

  useEffect(() => {
    dispatch(addKanjies(8));

    document.addEventListener("keydown", (event) => {
      if (!flagObject[event.code]) {
        flagObject[event.code] = true;
        switch (event.code) {
          case "ShiftLeft":
          case "ShiftRight":
            dispatch(clickShift(true));
            break;
          case "CapsLock":
            dispatch(clickCaps(true));
            break;
          case "AltLeft":
          case "AltRight":
            dispatch(clickAlt(true));
            break;
          default:
            dispatch(buttonClick(event.code));
            break;
        }
      }
    });

    window.addEventListener("keyup", (event) => {
      flagObject[event.code] = false;

      switch (event.code) {
        case "ShiftLeft":
        case "ShiftRight":
          dispatch(clickShift(false));
          break;
        case "CapsLock":
          dispatch(clickCaps(false));
          break;
        case "AltLeft":
        case "AltRight":
          dispatch(clickAlt(false));
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <div className="memoSymb">
      <div className="memoSymb__kangi">
        <div className="memoSymb__elem">{kanji}</div>
      </div>
      <div
        className="memoSymb__grid"
        style={keyboardLetters.length > 10 ? gridStyles : {}}
      >
        {keyboardLetters.map((letter, i) => (
          <Guess key={letter} letter={letter} kanji={kanjies[i]} />
        ))}
      </div>
      <Keyboard keyboard={keyboards} />
    </div>
  );
};

export default MemoSymbolGame;
