import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { random } from "@/components/shared/utils/random";
import UserStore from "@/components/store/UserStore";

const colors = [
  { color: "red", colorName: "Красный" },
  { color: "#d4ce31", colorName: "Желтый" },
  { color: "green", colorName: "Зеленый" },
  { color: "blue", colorName: "Голубой" },
  { color: "black", colorName: "Черный" },
  { color: "gray", colorName: "Серый" },
];
const shapes = [
  { title: "circle", path: "circle()" },
  { title: "square", path: "polygon(0 0, 0 100%, 100% 100%, 100% 0)" },
  { title: "triangle", path: "polygon(50% 0, 0 100%, 100% 100%)" },
  {
    title: "plus",
    path: "polygon(0 40%, 39% 40%, 39% 0, 60% 0, 60% 40%, 100% 40%, 100% 58%, 60% 59%, 60% 100%, 38% 100%, 38% 58%, 0 58%)",
  },
  { title: "romb", path: "polygon(50% 0, 0 50%, 50% 100%, 100% 50%)" },
  {
    title: "cross",
    path: "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)",
  },
];

const generatePosition = () => {
  let x = random(10, 90);
  let y = 11;
  if (x <= 25 || x >= 75) {
    y = random(10, 90);
  }
  if (x > 25 && x < 75) {
    y = random(11, 16);
  }
  return { x, y };
};

type Shape = {
  color: string;
  shape: {
    title: string;
    path: string;
  };
};

const getRandomItem = <T,>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)];

const generateRandomShape = (): Shape => ({
  color: colors[random(0, colors.length - 1)].color,
  shape: getRandomItem(shapes),
});

const PeripheralVision: React.FC = () => {
  const [centralColor, setCentralColor] = useState<string | null>(null);
  const [centralShape, setCentralShape] = useState<string | null>(null);
  const [target, setTarget] = useState<Shape | null>(null);
  const [position, setPosition] = useState<{
    top: string;
    right: string;
  } | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [round, setRound] = useState<number>(0);
  const [timer, setTimer] = useState<number>(10);

  const startTest = () => {
    UserStore.setIsOpenSidebar(false);
    setIsTestActive(true);
    setRound(1);
    setTimer(10);
    setIsCorrect(null);
    generateNewTarget();
  };

  const stopTest = () => {
    setIsTestActive(false);
    setIsCorrect(null);
    UserStore.addRatingTest(round, 2);
  };

  const generateNewTarget = () => {
    setTarget(generateRandomShape());
    setCentralColor(null);
    setCentralShape(null);
    setIsCorrect(null);
    const newPosition = generatePosition();
    setPosition({
      right: `${newPosition.x}%`,
      top: `${newPosition.y}%`,
    });
  };

  const checkAnswer = () => {
    if (!target || !centralColor || !centralShape) {
      setIsCorrect(false);
      setInterval(() => {
        stopTest();
      }, 3000);
      return;
    }
    if (centralColor === target.color && centralShape === target.shape.title) {
      setIsCorrect(true);
      setTimer(10);
      generateNewTarget();
    } else {
      setIsCorrect(false);
      stopTest();
    }
  };

  useEffect(() => {
    if (!isTestActive || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isTestActive, timer]);

  useEffect(() => {
    if (timer === 0 && round < 6) {
      setRound((prev) => prev + 1);
      setTimer(10);
      generateNewTarget();
    } else if (timer === 0) {
      stopTest();
    }
  }, [timer]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isTestActive) return;
      if (event.key === " ") {
        checkAnswer();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTestActive]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Периферическое зрение</h1>
      <div className={styles.controls}>
        <button
          onClick={startTest}
          disabled={isTestActive}
          className={styles.button}
        >
          Start
        </button>
        <button
          onClick={stopTest}
          disabled={!isTestActive}
          className={styles.button}
        >
          Stop
        </button>
      </div>

      {isTestActive && (
        <>
          <div className={styles.testArea}>
            <div className={styles.centralArea}>
              <div className={styles.lists}>
                <div className={styles.list}>
                  {colors.map(({ color, colorName }) => (
                    <button
                      key={color}
                      onClick={() => setCentralColor(color)}
                      className={`${styles.listItem} ${
                        centralColor === color ? styles.selected : ""
                      }`}
                    >
                      {colorName}
                    </button>
                  ))}
                </div>
                <div className={styles.attention_center}></div>
                <div className={styles.list}>
                  {shapes.map((shape) => (
                    <button
                      key={shape.title}
                      onClick={() => setCentralShape(shape.title)}
                      className={`${
                        centralShape === shape.title
                          ? styles.selected + " " + styles.figures
                          : styles.figures
                      }`}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#007bff",
                          clipPath: shape.path,
                        }}
                      ></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {target && position && (
              <div
                className={styles.target}
                style={{
                  width: 100,
                  height: 100,
                  clipPath: target.shape.path,
                  top: position.top,
                  left: position.right,
                  backgroundColor: target.color,
                }}
              ></div>
            )}
          </div>

          <div className={styles.feedback}>
            {isCorrect === true && <p className={styles.correct}>Correct</p>}
            {isCorrect === false && <p className={styles.wrong}>Wrong</p>}
          </div>

          <button onClick={checkAnswer} className={styles.submitButton}>
            Check Answer
          </button>

          <p className={styles.timer}>Time left: {timer}s</p>
        </>
      )}

      {!isTestActive && round > 0 && (
        <div className={styles.result}>
          <p>Test complete. You completed {round} rounds.</p>
        </div>
      )}
    </div>
  );
};

export default PeripheralVision;
