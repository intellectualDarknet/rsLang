import React, { useEffect, useState } from "react";

import "./keyboard.scss";
import { KeyboardBtn } from "../keyboard-btn/keyboard-btn";

export const Keyboard = (props: any): JSX.Element => {
  return (
    <div className="keyboard">
      {props.keyboard.map((rows: any, index: number) => (
        <div key={index} className="row">
          {rows.map((elem: any) => (
            <KeyboardBtn key={elem.key} props={elem} />
          ))}
        </div>
      ))}
    </div>
  );
};
