import React, { useState, useEffect } from "react";
import repeatArray from "./repeatArray";
import "./App.css";

const count = 15;
const text = repeatArray
  .map(
    ({ title, repeatText }) =>
      `${title} ${new Array(count).fill(repeatText).join("")}`
  )
  .join(" ");
function App() {
  const [str, setStr] = useState(text);
  useEffect(() => {
    const keydownHandler = ({ key }) => {
      const pattern = new RegExp(
        `^${key.length === 1 && ["]"].indexOf(key) === -1 ? `[${key}]` : key}`
      );
      setStr(prevStr => {
        const resultStr = prevStr.replace(pattern, "");
        if (!resultStr) {
          return text;
        }
        return resultStr;
      });
    };
    document.body.addEventListener("keydown", keydownHandler);
    return () => document.body.removeEventListener("keydown", keydownHandler);
  }, []);
  return <div className="text">{str.replace(/ /g, "•").slice(0, 40)}</div>;
}

export default App;
