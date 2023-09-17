import { useEffect, useState } from "react";
import "./App.css";
import Timer from "./components/Timer";

function generateColor() {
  let stringsArr = "0123456789ABCDEF".split("");
  let color = new Array(6)
    .fill("0")
    .map(() => stringsArr[Math.floor(Math.random() * stringsArr.length)])
    .join("");

  return `#${color}`;
}

function App() {
  const [color, setColor] = useState(undefined);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [expire, setExpire] = useState(false);
  const time = 3000;

  function newColor() {
    const newColor = generateColor();
    setColor(newColor);
    setAnswers(
      [newColor, generateColor(), generateColor()].sort(
        () => 0.5 - Math.random()
      )
    );
    setSelected(undefined);
  }

  function checkAnswer(answer) {
    if (answer === color) {
      setSelected(true);

      setTimeout(() => {
        newColor();
      }, time);
    } else {
      setSelected(false);
      setExpire(true);

      setTimeout(() => {
        setExpire(false);
      }, 1500);
    }
  }

  useEffect(() => {
    newColor();
  }, []);

  return (
    <>
      <div
        className={"color-display"}
        style={{ backgroundColor: `${color}` }}
      ></div>
      <div className={"buttons-container"}>
        {answers.map((answer) => {
          return (
            <button key={answer} onClick={() => checkAnswer(answer)}>
              {answer}
            </button>
          );
        })}
      </div>

      <div className={"result-container"}>
        {selected === true && <p className={"correct"}>Correct answer</p>}
        {selected === false && expire === true && (
          <p className={"danger"}>Wrong answer</p>
        )}
      </div>

      <div className={"timer"}>
        {selected === true && <Timer timeLeft={time} />}
      </div>
    </>
  );
}

export default App;
