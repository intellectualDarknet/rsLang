import React, { useEffect, useRef, useState } from "react";
import "./hiragana.scss";

import { Keyboard } from "../../../components/keyboard/keyboard";
import { keyboards } from "../../../components/keyboard/keyboard.info";
import Guess from "../../../components/hiro-kata-guess/guess";

import {
  AppDispatch,
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import {
  addMistakeInArray,
  // backSpace,
  // nullifyAnswer,
  // changeAnswer,
  deleteMistakeFromArray,
  nextKanji,
} from "../../../store/hira-kata-slice";

const gridStyles = {
  gridTemplateColumns: `repeat(8, 1fr)`,
  gap: "25px",
  margin: "40px 2vw",
};

interface IHiragana {
  [key: string]: string[];
}

interface IFlagObj {
  [key: string]: boolean;
}

const hiraganaObj: IHiragana = {
  а: ["а", "あ"],
  ка: ["ка", "か"],
  са: ["са", "さ"],
  та: ["та", "た"],
  на: ["на", "な"],
  ха: ["ха", "は"],
  ма: ["ма", "ま"],
  ра: ["ра", "ら"],
  ва: ["ва", "わ"],
  и: ["и", "い"],
  ки: ["ки", "き"],
  си: ["си", "し"],
  ти: ["ти", "ち"],
  ни: ["ни", "に"],
  хи: ["хи", "ひ"],
  ми: ["ми", "み"],
  ри: ["ри", "り"],
  у: ["у", "う"],
  ку: ["ку", "く"],
  су: ["су", "す"],
  цу: ["цу", "つ"],
  ну: ["ну", "ぬ"],
  фу: ["фу", "ふ"],
  му: ["му", "む"],
  ру: ["ру", "る"],
  ю: ["ю", "ゆ"],
  э: ["э", "え"],
  кэ: ["кэ", "け"],
  сэ: ["сэ", "せ"],
  тэ: ["тэ", "て"],
  нэ: ["нэ", "ね"],
  хэ: ["хэ", "へ"],
  мэ: ["мэ", "め"],
  рэ: ["рэ", "れ"],
  во: ["во", "を"],
  о: ["о", "お"],
  ко: ["ко", "こ"],
  со: ["со", "そ"],
  то: ["то", "と"],
  но: ["но", "の"],
  хо: ["хо", "ほ"],
  мо: ["мо", "も"],
  ро: ["ро", "ろ"],
  я: ["я", "ゃ"],
  ё: ["ё", "ょ"],

  га: ["га", "が "],
  дза: ["дза", "ざ "],
  да: ["да", "だ "],
  ба: ["ба", "ば "],
  па: ["па", "ぱ "],
  ги: ["ги", "ぎ"],
  дзи: ["дзи", "じ"],
  би: ["би", "び"],
  пи: ["пи", "ぴ"],
  гу: ["гу", "ぐ"],
  дзу: ["дзу", "ず"],
  бу: ["бу", "ぶ"],
  пу: ["пу", "ぷ"],
  гэ: ["гэ", "げ"],
  дзэ: ["дзэ", "ぜ"],
  бэ: ["бэ", "べ"],
  пэ: ["пэ", "ぺ"],
  го: ["го", "ご"],
  дзо: ["дзо", "ぞ"],
  бо: ["бо", "ぼ"],
  по: ["по", "ぽ"],

  // кя: ["кя", "きゃ"],
  // ся: ["ся", "しゃ"],
  // тя: ["тя", "ちゃ"],
  // ня: ["ня", "にゃ"],
  // хя: ["хя", "ひゃ"],
  // мя: ["мя", "みゃ"],
  // ря: ["ря", "りゃ"],

  // кю: ["кю", "きゅ"],
  // сю: ["сю", "しゅ"],
  // тю: ["тю", "ちゅ"],
  // ню: ["ню", "にゅ"],
  // хю: ["хю", "ひゅ"],
  // мю: ["мю", "みゅ"],
  // рю: ["рю", "りゅ"],

  // кё: ["кё", "きょ"],
  // сё: ["сё", "しょ"],
  // тё: ["тё", "ちょ"],
  // нё: ["нё", "にょ"],
  // хё: ["хё", "ひょ"],
  // мё: ["мё", "みょ"],
  // рё: ["рё", "りょ"],

  // гя: ['гя', "ぎゃ"]
  // дзя: ['дзя', "じゃ"]
  // бя: ['бя', "びゃ"]
  // пя: ['пя', "ぴゃ"]

  // гю: [ "гю","ぎゅ" ]
  // дзю: [ "дзю","じゅ" ]
  // бю: [ "бю","びゅ" ]
  // пю: [ "пю","ぴゅ" ]

  // гё: ["гё", "ぎょ" ]
  // дзё: ["дзё", "じょ" ]
  // бё: ["бё", "びょ" ]
  // пё: ["пё", "ぴょ" ]
};

const HiraganaGame = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const flagObject: IFlagObj = {};
  const flattedKeyboard = keyboards.flat();
  const HiraganaKeys = Object.keys(hiraganaObj);
  const inputRef = useRef(null);

  const { mistakesArray, expectedKanji, expectedAnswer } = useAppSelector(
    (state: RootState) => state.hiraganaState
  );

  const [answer, setAnswer] = useState("");

  function buttonClick(payload: string) {
    const clickedButton = flattedKeyboard.find((elem) => elem.key === payload)[
      "ru"
    ]["lowercase"];

    setAnswer((prev) => prev + clickedButton);
  }

  useEffect(() => {
    if (answer.length == expectedAnswer.length) {
      console.log("equality");
      if (answer == expectedAnswer) {
        const index = Math.round(Math.random() * (HiraganaKeys.length - 1));
        const expectedKanji = hiraganaObj?.[HiraganaKeys[index]]?.[1];
        const expectedAnswer = hiraganaObj?.[HiraganaKeys[index]]?.[0];
        dispatch(deleteMistakeFromArray(expectedAnswer));
        console.log(expectedKanji, expectedAnswer);
        dispatch(nextKanji({ expectedKanji, expectedAnswer }));
      } else {
        dispatch(addMistakeInArray(expectedAnswer));
      }
      setAnswer("");
      // dispatch(nullifyAnswer());
    }
  }, [answer]);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (!flagObject[event.code]) {
        flagObject[event.code] = true;
        switch (event.code) {
          case "ShiftLeft":
          case "ShiftRight":
          case "CapsLock":
          case "AltLeft":
          case "AltRight":
            break;
          case "Backspace":
            // dispatch(backSpace());
            break;
          default:
            buttonClick(event.code);
            break;
        }
      }
    });

    window.addEventListener("keyup", (event) => {
      flagObject[event.code] = false;
    });
  }, []);

  return (
    <div className="hiragana">
      <div className="hiragana__kangi">
        <div className="hiragana__elem">{expectedKanji}</div>
      </div>
      <div className="hiragana__grid">
        {HiraganaKeys.map((letter) => (
          <Guess
            key={hiraganaObj[letter][0]}
            letter={hiraganaObj[letter][0]}
            kanji={hiraganaObj[letter][1]}
          />
        ))}
      </div>
      <div>{answer}</div>
      <Keyboard keyboard={keyboards} />
    </div>
  );
};

export default HiraganaGame;
