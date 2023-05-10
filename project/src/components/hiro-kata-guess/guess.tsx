import "./guess.scss";
import React from "react";

import { RootState, useAppSelector } from "../../store/store";

const Guess = (props: any): JSX.Element => {
  const { answersArray, expectedKanji } = useAppSelector(
    (state: RootState) => state.hiraganaState
  );

  return (
    <>
      {!answersArray.includes(props.letter) ? (
        <div
          className={
            expectedKanji === props.kanji ? "guessABC animated" : "guessABC"
          }
        >
          {props.letter} = {props.kanji}
        </div>
      ) : (
        <div
          className={
            expectedKanji === props.kanji ? "guessABC animated" : "guessABC"
          }
        >
          {props.kanji}
        </div>
      )}
    </>
  );
};

export default Guess;
