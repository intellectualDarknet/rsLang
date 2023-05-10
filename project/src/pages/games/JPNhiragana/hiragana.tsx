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
  addAnswerInArray,
  deleteAnswerFromArray,
  nextKanji,
} from "../../../store/hira-kata-slice";

interface IHiragana {
  [key: string]: string[];
}

interface IFlagObj {
  [key: string]: boolean;
}

export const hiraganaObj: IHiragana = {
  а: ["а", "あ"],
  ка: ["ка", "か"],
  га: ["га", "が "],

  са: ["са", "さ"],
  на: ["на", "な"],
  ма: ["ма", "ま"],
  ра: ["ра", "ら"],
  ва: ["ва", "わ"],
  и: ["и", "い"],
  ки: ["ки", "き"],
  си: ["си", "し"],
  дзи: ["дзи", "じ/ぢ"],
  ти: ["ти", "ち"],
  ни: ["ни", "に"],
  хи: ["хи", "ひ"],
  ми: ["ми", "み"],
  ри: ["ри", "り"],
  у: ["у", "う"],
  су: ["су", "す"],
  цу: ["цу", "つ"],
  ну: ["ну", "ぬ"],
  му: ["му", "む"],
  ру: ["ру", "る"],
  ю: ["ю", "ゆ"],
  э: ["э", "え"],
  кэ: ["кэ", "け"],
  сэ: ["сэ", "せ"],
  тэ: ["тэ", "て"],
  нэ: ["нэ", "ね"],
  мэ: ["мэ", "め"],
  рэ: ["рэ", "れ"],
  во: ["во", "を"],
  о: ["о", "お"],
  со: ["со", "そ"],
  то: ["то", "と"],
  но: ["но", "の"],
  хо: ["хо", "ほ"],
  мо: ["мо", "も"],
  ро: ["ро", "ろ"],
  я: ["я", "ゃ"],
  ё: ["ё", "ょ"],

  дза: ["дза", "ざ "],

  та: ["та", "た"],
  да: ["да", "だ "],

  ба: ["ба", "ば "],
  ха: ["ха", "は"],
  па: ["па", "ぱ "],

  ги: ["ги", "ぎ"],
  би: ["би", "び"],
  пи: ["пи", "ぴ"],

  гу: ["гу", "ぐ"],
  ку: ["ку", "く"],

  дзу: ["дзу", "ず/づ"],
  пу: ["пу", "ぷ"],
  бу: ["бу", "ぶ"],
  фу: ["фу", "ふ"],

  гэ: ["гэ", "げ"],
  дзэ: ["дзэ", "ぜ"],
  бэ: ["бэ", "べ"],
  хэ: ["хэ", "へ"],
  пэ: ["пэ", "ぺ"],
  го: ["го", "ご"],
  ко: ["ко", "こ"],

  дзо: ["дзо", "ぞ"],
  бо: ["бо", "ぼ"],
  по: ["по", "ぽ"],

  // кя: ["кя", "きゃ"],Ц
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

  const { expectedKanji, expectedAnswer } = useAppSelector(
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
        dispatch(addAnswerInArray(answer));
        console.log(expectedKanji, expectedAnswer);
        dispatch(nextKanji({ expectedKanji, expectedAnswer }));
      } else {
        console.log("try to delete answer");
        dispatch(deleteAnswerFromArray(expectedAnswer));
      }
      setAnswer("");
    }
  }, [answer]);

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
          case "Enter":
            break;
          case "Backspace":
            setAnswer((prev) => {
              if (prev.length) {
                return prev.slice(0, prev.length - 1);
              }
              return prev;
            });
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
      <div className="hiragana__answer">{answer}</div>
      <div className="hiragana__grid">
        {HiraganaKeys.map((letter) => (
          <Guess
            key={hiraganaObj[letter][0]}
            letter={hiraganaObj[letter][0]}
            kanji={hiraganaObj[letter][1]}
          />
        ))}
      </div>
      <Keyboard keyboard={keyboards} />
    </div>
  );
};

export default HiraganaGame;
