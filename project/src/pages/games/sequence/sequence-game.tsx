import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";

import { AppDispatch, RootState, useAppSelector } from "../../../store/store";
import {
  GetSequenceWordsRequest,
  GetWordsRequest,
  SequenceWord,
  Word,
} from "../../../interfaces/word";
import {
  useCreateSequenceMutation,
  useGetSequencesMutation,
  useGetSequenceWordsMutation,
} from "../../../services/sequence-service";
import "./sequence-game.scss";
import { Sequence } from "../../../interfaces/sequence";

const SequenceGame = (): JSX.Element => {
  const userId: string = useAppSelector(
    (state: RootState) => state.authState.auth?.userId
  );

  const [getSequenceWords] = useGetSequenceWordsMutation();
  const [getSequences] = useGetSequencesMutation();
  const [createSequence, { isLoading }] = useCreateSequenceMutation();
  const [visibility, setVisibility] = useState(false);

  const sequenceWords: SequenceWord[] = useAppSelector(
    (state: RootState) => state.sequenceState?.sequenceWords || []
  );

  const sequence: Sequence[] = useAppSelector(
    (state: RootState) => state.sequenceState?.sequences || []
  );

  const [decades, setDecades] = useState(10);
  const [newArray, setNewArray] = useState([]);

  useEffect(() => {
    getSequenceWords({});
    if (userId) {
      getSequences({ userId });
    } else {
      // TODO getSequences for unauthorized user
      getSequences({ userId });
    }
  }, []);

  useEffect(() => {
    console.log(sequence);
  }, [sequence]);

  useEffect(() => {
    setNewArray(
      new Array(decades / 10).fill(2).map((elem, i) => {
        return i * 10;
      })
    );
  }, [decades]);

  function Memorize() {
    setDecades((prev) => prev + 10);
  }

  function toggleVisibility() {
    setVisibility((prev) => !prev);
  }

  function newGame() {
    const request = {
      userId,
      words: sequenceWords.slice(0, decades).map((elem) => elem.word),
    };
    // TODO rethink logic

    if (userId) {
      createSequence(request);
      getSequences({ userId });
    }
    getSequenceWords({});
    setDecades(10);
  }

  return (
    <>
      {
        <div className="sequence__box">
          {newArray.map((elem2) => (
            <div
              key={elem2}
              className="sequence__column"
              style={{ opacity: visibility ? 0 : 1 }}
            >
              {sequenceWords.slice(elem2, elem2 + 9).map((elem) => (
                <div className="sequence__elem" key={elem.word}>
                  {elem.word}
                </div>
              ))}
            </div>
          ))}
          <div className="sequence__buttons">
            <button
              onClick={Memorize}
              className=" sequence__button sequence__memorize"
            >
              Memorized
            </button>
            <button
              className="sequence__button sequence__hide"
              onClick={toggleVisibility}
            >
              Hide
            </button>

            <button
              className=" sequence__button sequence__new"
              onClick={newGame}
            >
              New game
            </button>
          </div>
        </div>
      }

      <div className="sequence__sidebar">
        {sequence.map((elem) => (
          <div key={elem.date.toString()} className="sidebar__sequence">
            <div className="sidebar__time">{elem.date.toString()}</div>
            <div className="sidebar__words">{elem.words.join(" ")}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SequenceGame;
