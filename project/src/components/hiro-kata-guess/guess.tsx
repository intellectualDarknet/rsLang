import "./guess.scss";
import React from "react";

import { RootState, useAppSelector } from "../../store/store";

const Guess = (props: any): JSX.Element => {
  const { mistakesArray, expectedKanji, expectedAnswer } = useAppSelector(
    (state: RootState) => state.hiraganaState
  );

  return (
    <>
      {mistakesArray.includes(props.letter) ? (
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
