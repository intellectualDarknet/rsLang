import React, { useEffect, useRef, useState } from "react";
import "./learn-words.scss";

import {
  useCreateWordMutation,
  useUpdateWordMutation,
  useGetWordsToRepeatMutation,
  useGetWordsToLearnMutation,
} from "../../../services/learn-words-service";

import { AppDispatch, RootState, useAppSelector } from "../../../store/store";
import { ILearnWord } from "../../../interfaces/learn-words";

interface IFlagObj {
  [key: string]: boolean;
}

const LearnWordsGame = (): JSX.Element => {
  const userId: string = useAppSelector(
    (state: RootState) => state.authState.auth?.userId
  );
  const flagObject: IFlagObj = {};

  const [createWord] = useCreateWordMutation();
  const [updateWord] = useUpdateWordMutation();
  const [getWordsToRepeat] = useGetWordsToRepeatMutation();
  const [getWordsToLearn] = useGetWordsToLearnMutation();

  const [mode, setMode] = useState(true);
  const [showFlag, setShowFlag] = useState(false);

  const wordsToRepeat: ILearnWord[] = useAppSelector(
    (state: RootState) => state.learnWordsState.wordsToRepeat || []
  );

  const wordsToLearn: ILearnWord[] = useAppSelector(
    (state: RootState) => state.learnWordsState?.wordsToLearn || []
  );

  console.log("wordsToRepeat", wordsToRepeat);
  console.log("wordsToLearn", wordsToLearn);

  function memorized(event: React.SyntheticEvent) {
    console.log(
      (event.target as HTMLElement).closest("div").querySelector("input").value
    );
  }
  function show() {
    console.log(123);
  }
  function repeat() {
    console.log(123);
  }
  function addNewWord() {
    console.log(123);
  }

  function changeLearnWord(event: React.ChangeEvent<HTMLInputElement>) {
    wordsToLearn.find(
      (elem) => elem.id == event.target.dataset.id
    ).howToRemember = event.target.value;
  }

  function changeRepeatWord(event: React.ChangeEvent<HTMLInputElement>) {
    wordsToRepeat.find(
      (elem) => elem.id == event.target.dataset.id
    ).howToRemember = event.target.value;
  }

  useEffect(() => {
    getWordsToRepeat({ userId });
    getWordsToLearn({ userId });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      console.log(event.code);
      if (!flagObject[event.code]) {
        flagObject[event.code] = true;
        switch (event.code) {
          case "ShiftLeft":
          case "ShiftRight":
          case "CapsLock":
          case "AltLeft":
          case "AltRight":
          case "ControlLeft":
          case "ControlRight":
            break;
          case "Backspace":
            // setAnswer((prev) => {
            //   if (prev.length) {
            //     return prev.slice(0, prev.length - 1);
            //   }
            //   return prev;
            // });
            break;
          default:
            // buttonClick(event.code);
            break;
        }
      }
    });

    // window.addEventListener("keyup", (event) => {});
  }, []);

  return (
    <div className="learnWordsGame">
      <div className="learnWordsGame__modes">
        {mode ? (
          <div onClick={() => setMode(false)} className="learnWordsGame__mode">
            Learn
          </div>
        ) : (
          <div onClick={() => setMode(true)} className="learnWordsGame__mode">
            Repeat
          </div>
        )}
      </div>
      <div className="learnWordsGame__words">
        {mode
          ? wordsToRepeat.map((repeatWord) => (
              <div
                key={repeatWord.writings}
                className="learnWordsGame__container"
              >
                <span
                  style={showFlag ? { visibility: "hidden" } : null}
                  className="learnWordsGame__hierogliphs"
                >
                  {repeatWord.hierogliphs}
                </span>
                <span
                  style={showFlag ? { visibility: "hidden" } : null}
                  className="learnWordsGame__writings"
                >
                  {repeatWord.writings}
                </span>
                <input
                  type="text"
                  className="learnWordsGame__writings"
                  data-id={repeatWord.id}
                  defaultValue={repeatWord.howToRemember}
                  onChange={changeRepeatWord}
                />
                <span className="learnWordsGame__meaning">
                  {repeatWord.meaning}
                </span>
              </div>
            ))
          : wordsToLearn.map((repeatWord) => (
              <div
                key={repeatWord.writings}
                className="learnWordsGame__container"
              >
                <span className="learnWordsGame__hierogliphs">
                  {repeatWord.hierogliphs}
                </span>
                <span className="learnWordsGame__writings">
                  {repeatWord.writings}
                </span>
                <input
                  type="text"
                  data-id={repeatWord.id}
                  placeholder="assosiation"
                  defaultValue={repeatWord.howToRemember}
                  onChange={changeLearnWord}
                />
                <span className="learnWordsGame__meaning">
                  {repeatWord.meaning}
                </span>
                <button className="learnWordsGame__learn" onClick={memorized}>
                  Изучить
                </button>
              </div>
            ))}
      </div>

      <div className="learnWordsGame__buttons">
        <button className="learnWordsGame__button" onClick={show}>
          Показать
        </button>
      </div>
      <div className="learnWordsGame__add">
        <input
          placeholder="kanji"
          className="learnWordsGame__input"
          type="text"
        />
        <input
          placeholder="hira/kata"
          className="learnWordsGame__input"
          type="text"
        />
        <input
          placeholder="add meaning"
          className="learnWordsGame__input"
          type="text"
        />
        <input
          placeholder="assosiation"
          className="learnWordsGame__input"
          type="text"
        />
      </div>
      <div className="learnWordsGame__buttons">
        {" "}
        <button className="learnWordsGame__button" onClick={addNewWord}>
          Добавить новое слово
        </button>
      </div>
    </div>
  );
};

export default LearnWordsGame;
