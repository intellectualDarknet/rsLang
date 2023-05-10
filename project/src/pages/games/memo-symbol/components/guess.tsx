import { TLanguage } from "../../../../store/keyboard-slice";
import { RootState, useAppSelector } from "../../../../store/store";
import "./guess.scss";
import React from "react";

const Guess = (props: any): JSX.Element => {
  const lettersClicked: string[] = useAppSelector(
    (state: RootState) => state.keyboardState?.lettersClicked
  );
  const mistakeInLetter: string = useAppSelector(
    (state: RootState) => state.keyboardState?.mistakeInLetter
  );

  const expectedLetter: string = useAppSelector(
    (state: RootState) => state.keyboardState?.expectedLetter
  );

  return (
    <>
      {!lettersClicked.includes(props.letter) ||
      (expectedLetter == props.letter && mistakeInLetter) ? (
        <div
          className={
            expectedLetter == props.letter ? "guess animated" : "guess"
          }
        >
          {props.letter} = {props.kanji}
        </div>
      ) : (
        <div
          className={
            expectedLetter == props.letter ? "guess animated" : "guess"
          }
        >
          {props.kanji}
        </div>
      )}
    </>
  );
};

export default Guess;
