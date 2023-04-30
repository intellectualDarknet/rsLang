import React, { useEffect, useState } from "react";
import { TCase, TLanguage } from "../../store/keyboard-slice";
import { AppDispatch, RootState, useAppSelector } from "../../store/store";
import "./keyboard-btn.scss";

interface languageMode {
  lowercase: string;
  uppercase: string;
  capsLowercase: string;
  capsUppercase: string;
}

export const KeyboardBtn = (props: any): JSX.Element => {
  const btnInfo = props;

  const language: TLanguage = useAppSelector(
    (state: RootState) => state.keyboardState.language || "en"
  );

  const type: TCase = useAppSelector(
    (state: RootState) => state.keyboardState.type || "lowercase"
  );

  if (btnInfo.props.key === "Quote") {
    btnInfo.props.en = {
      lowercase: "&#39",
      uppercase: "&#34",
      capsLowercase: "&#39",
      capsUppercase: "&#34",
    };
  }

  return (
    <>
      <div
        style={
          btnInfo.props.color ? { backgroundColor: btnInfo.props.color } : null
        }
        className={`key ${
          btnInfo.props.customClass && btnInfo.props.customClass
        } `}
      >
        {btnInfo.props[language][type]}
      </div>
    </>
  );
};
// }

// function initHosts(): void {
//   this.host = this.querySelector('.key');
// }

// function toggleState(isPressed: boolean): void {
//   if (isPressed !== this.isPressed) {
//     this.isPressed = isPressed;
//     this.host.classList.toggle('azure');
//   }
// }

// function onKeyDown(): void {
//   switch (this.btnInfo.key) {
//     case 'ShiftLeft':
//     case 'ShiftRight':
//       keyboardService.shiftKeyDown();
//       break;
//     case 'CapsLock':
//       keyboardService.capsKeyDown();
//       break;
//     case 'AltLeft':
//     case 'AltRight':
//       keyboardService.altKeyDown();
//       break;
//     case 'ControlLeft':
//     case 'ControlRight':
//     case 'MetaLeft':
//     case 'MetaRight':
//       break;
//     default:
//       keyboardService.buttonPress.broadcast(this.host.innerHTML.trim());
//       break;
//   }
// }

// function onKeyUp(): void {
//   switch (this.btnInfo.key) {
//     case 'ShiftLeft':
//     case 'ShiftRight':
//       keyboardService.shiftKeyUp();
//       break;
//     case 'AltLeft':
//     case 'AltRight':
//       keyboardService.altKeyUp();
//       break;
//     case 'CapsLock':
//       keyboardService.capsKeyUp();
//       break;
//     default:
//       break;
//   }
// }
