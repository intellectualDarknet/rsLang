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
  const [showFlag, setShowFlag] = useState(true);

  const wordsToRepeat: ILearnWord[] = useAppSelector(
    (state: RootState) => state.learnWordsState.wordsToRepeat || []
  );

  const wordsToLearn: ILearnWord[] = useAppSelector(
    (state: RootState) => state.learnWordsState?.wordsToLearn || []
  );

  console.log("wordsToRepeat", wordsToRepeat);
  console.log("wordsToLearn", wordsToLearn);

  function onInputBlur(event: React.SyntheticEvent) {
    const inputHtml = event.target as HTMLInputElement;
    const word = wordsToLearn.find((elem) => elem.id == inputHtml.dataset.id);
    updateWord({
      userId,
      wordId: word.id,
      word: { ...word, howToRemember: inputHtml.value },
    });
  }

  function fetchNewWords() {
    getWordsToLearn({ userId, word: { limit: wordsToLearn.length + 10 } });
  }

  function show() {
    setShowFlag((prev) => !prev);
  }

  function repeat(event: React.MouseEvent) {
    const buttonHtml = event.target as HTMLButtonElement;
    const word = wordsToRepeat.find((elem) => elem.id == buttonHtml.dataset.id);
    updateWord({
      userId,
      wordId: word.id,
      word: { ...word },
    });
  }
  function addNewWord() {
    // createWord
  }

  useEffect(() => {
    getWordsToRepeat({ userId });
    getWordsToLearn({ userId });
  }, []);

  return (
    <div className="learnWordsGame">
      <div className="learnWordsGame__modes">
        {mode ? (
          <div onClick={() => setMode(false)} className="learnWordsGame__mode">
            Repeat
          </div>
        ) : (
          <div onClick={() => setMode(true)} className="learnWordsGame__mode">
            Learn
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
                />
                <span className="learnWordsGame__meaning">
                  {repeatWord.meaning}
                </span>
                <button
                  data-id={repeatWord.id}
                  onClick={repeat}
                  className="learnWordsGame__repeat"
                >
                  Memo
                </button>
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
                  className="learnWordsGame__input"
                  defaultValue={repeatWord.howToRemember}
                  onBlur={onInputBlur}
                />
                <span className="learnWordsGame__meaning">
                  {repeatWord.meaning}
                </span>
              </div>
            ))}
      </div>

      {mode ? (
        <button className="learnWordsGame__button" onClick={show}>
          Показать
        </button>
      ) : (
        <>
          <button
            className="learnWordsGame__button learnWordsGame__button10"
            onClick={fetchNewWords}
          >
            Добавить новые 10 слов
          </button>

          <div className="learnWordsGame__newWord">
            <button className="learnWordsGame__button" onClick={addNewWord}>
              Добавить новое слово
            </button>
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
                placeholder="assosiation"
                className="learnWordsGame__input"
                type="text"
              />
              <input
                placeholder="add meaning"
                className="learnWordsGame__input"
                type="text"
              />
              <input
                placeholder="add sign for future search"
                className="learnWordsGame__input"
                type="text"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LearnWordsGame;
