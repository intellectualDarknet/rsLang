import React, { useEffect, useRef, useState } from "react";
import "./katakana.scss";

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

const katakanaSoft: IHiragana = {
  кя: ["кя", "キャ"],
  кю: ["кю", "キュ"],
  кё: ["кё", "キョ"],
  ся: ["ся", "シャ"],
  сю: ["сю", "シュ"],
  сё: ["сё", "ショ"],
  гя: ["гя", "ギャ"],
  гю: ["гю", "ギュ"],
  гё: ["гё", "ギョ"],
  тя: ["тя", "チャ"],
  тю: ["тю", "チュ"],
  тё: ["тё", "チョ"],
  дзя: ["дзя", "ジャ/ヂャ"],
  дзю: ["дзю", "ジュ/ヂュ"],
  дзё: ["дзё", "ジョ/ヂョ"],
  ня: ["ня", "ニャ"],
  ню: ["ню", "ニュ"],
  нё: ["нё", "ニョ"],
  хя: ["хя", "ヒャ"],
  хю: ["хю", "ヒュ"],
  хё: ["хё", "ヒョ"],
  мя: ["мя", "ミャ"],
  мю: ["мю", "ミュ"],
  мё: ["мё", "ミョ"],
  бя: ["бя", "ビャ"],
  бю: ["бю", "ビュ"],
  бё: ["бё", "ビョ"],
  ря: ["ря", "リャ"],
  рю: ["рю", "リュ"],
  рё: ["рё", "リョ"],
  пя: ["пя", "ピャ"],
  пю: ["пю", "ピュ"],
  пё: ["пё", "ピョ"],
};

export const katakanaObj: IHiragana = {
  ка: ["ка", "カ"],
  ки: ["ки", "キ"],
  ку: ["ку", "ク"],
  кэ: ["кэ", "ケ"],
  ко: ["ко", "コ"],
  са: ["са", "サ"],
  си: ["си", "シ"],
  су: ["су", "ス"],
  сэ: ["сэ", "セ"],
  со: ["со", "ソ"],
  га: ["га", "ガ"],
  ги: ["ги", "ギ"],
  гу: ["гу", "グ"],
  гэ: ["гэ", "ゲ"],
  го: ["го", "ゴ"],
  дза: ["дза", "ザ"],
  дзи: ["дзи", "ジ/ヂ"],
  дзу: ["дзу", "ズ/ヅ"],
  дзэ: ["дзэ", "ゼ"],
  дзо: ["дзо", "ゾ"],
  та: ["та", "タ"],
  ти: ["ти", "チ"],
  цу: ["цу", "ツ"],
  тэ: ["тэ", "テ"],
  то: ["то", "ト"],
  на: ["на", "ナ"],
  ни: ["ни", "ニ"],
  ну: ["ну", "ヌ"],
  нэ: ["нэ", "ネ"],
  но: ["но", "ノ"],
  да: ["да", "ダ"],
  дэ: ["дэ", "デ"],
  до: ["до", "ド"],
  ма: ["ма", "マ"],
  ми: ["ми", "ミ"],
  му: ["му", "ム"],
  мэ: ["мэ", "メ"],
  мо: ["мо", "モ"],
  ха: ["ха", "ハ"],
  хи: ["хи", "ヒ"],
  фу: ["фу", "フ"],
  хэ: ["хэ", "ヘ"],
  хо: ["хо", "ホ"],
  ра: ["ра", "ラ"],
  ри: ["ри", "リ"],
  ру: ["ру", "ル"],
  рэ: ["рэ", "レ"],
  ро: ["ро", "ロ"],
  ба: ["ба", "バ"],
  би: ["би", "ビ"],
  бу: ["бу", "ブ"],
  бэ: ["бэ", "ベ"],
  бо: ["бо", "ボ"],
  ва: ["ва", "ワ"],
  ви: ["ви", "ウィ"],
  ву: ["ву", "于"],
  вэ: ["вэ", "ウェ"],
  о: ["о", "ヲ"],
  па: ["па", "パ"],
  пи: ["пи", "ピ"],
  пу: ["пу", "プ"],
  пэ: ["пэ", "ペ"],
  по: ["по", "ポ"],
  я: ["я", "ヤ"],
  ю: ["ю", "ユ"],
  ё: ["ё", "ヨ"],
};

const KatakanaGame = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const flagObject: IFlagObj = {};
  const flattedKeyboard = keyboards.flat();
  const Katakanakeys = Object.keys(katakanaObj);

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
        const index = Math.round(Math.random() * (Katakanakeys.length - 1));
        const expectedKanji = katakanaObj?.[Katakanakeys[index]]?.[1];
        const expectedAnswer = katakanaObj?.[Katakanakeys[index]]?.[0];
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
    <div className="katakana">
      <div className="katakana__kangi">
        <div className="katakana__elem">{expectedKanji}</div>
      </div>
      <div className="katakana__answer">{answer}</div>
      <div className="katakana__grid">
        {Katakanakeys.map((letter) => (
          <Guess
            key={katakanaObj[letter][0]}
            letter={katakanaObj[letter][0]}
            kanji={katakanaObj[letter][1]}
          />
        ))}
      </div>
      <Keyboard keyboard={keyboards} />
    </div>
  );
};

export default KatakanaGame;
