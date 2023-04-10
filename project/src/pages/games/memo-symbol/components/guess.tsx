import { TLanguage } from "../../../../store/keyboard-slice";
import { RootState, useAppSelector } from "../../../../store/store";
import "./guess.scss";
import React from "react";

const Guess = (props: any): JSX.Element => {
  // const clicked: string = useAppSelector(
  //   (state: RootState) => state.keyboardState?.clickedLetter
  // );

  const lettersClicked: string[] = useAppSelector(
    (state: RootState) => state.keyboardState?.lettersClicked
  );
  const mistakeInLetter: string = useAppSelector(
    (state: RootState) => state.keyboardState?.mistakeInLetter
  );

  return (
    <>
      {!lettersClicked.includes(props.letter) ||
      mistakeInLetter == props.letter ? (
        <div className="guess">
          {props.letter} = {props.kanji}
        </div>
      ) : (
        <div className="guess">{props.kanji}</div>
      )}
    </>
  );
};

export default Guess;
