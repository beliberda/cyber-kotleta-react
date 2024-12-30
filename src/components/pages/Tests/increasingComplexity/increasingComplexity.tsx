// components/TestComponent.tsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./style.module.css";
import { random } from "@/components/shared/utils/random";
import { randomCircle } from "@/components/pages/Trainings/utils";
import {
  ICircleItem,
  ShapeType,
} from "@/components/pages/Trainings/Test4/interfaces";
import UserStore from "@/components/store/UserStore";

const colorList = ["red", "blue"];

const IncreasingComplexity: React.FC = () => {
  const [shapes, setShapes] = useState<ICircleItem[]>([]);
  const [round, setRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<"Correct" | "Wrong" | null>(null);
  const [shapeType, setShapeType] = useState<ShapeType>("circle");
  const maxRounds = 10;

  const testRef = useRef<HTMLDivElement>(null);

  const generateShapes = useCallback(() => {
    setShapes(
      randomCircle(
        round < 5 ? 5 + (round - 1) * 2 : 13 + (round - 5),
        testRef.current?.offsetWidth,
        testRef.current?.offsetHeight,
        colorList,
        150,
        150
      )
    );
  }, [round, shapeType]);

  const startTest = () => {
    UserStore.setIsOpenSidebar(false);
    setIsRunning(true);
    setRound(1);
    setResult(null);
    generateShapes();
  };

  const stopTest = () => {
    setRound(1);
    setIsRunning(false);
    setShapes([]);
    setResult(null);
    UserStore.addRatingTest(round, 0);
  };

  const nextRound = useCallback(() => {
    if (round < maxRounds) {
      setRound((prevRound) => prevRound + 1);
      setResult(null);
      generateShapes();
    } else {
      stopTest();
    }
  }, [round, generateShapes]);

  const checkAnswer = (id: number, elem: ICircleItem) => {
    const redCount = shapes.filter((shape) => shape.color === "red").length;
    const blueCount = shapes.filter((shape) => shape.color === "blue").length;
    const newShapes = shapes.filter((_, i) => i !== id);
    setShapes(newShapes);
    if (newShapes.length === 0) {
      setResult("Correct");
      setTimeout(() => nextRound(), 2000);
    }
    if (redCount > blueCount && elem.color === "red") {
      return;
    }
    if (redCount < blueCount && elem.color === "blue") {
      return;
    }
    if (redCount === blueCount) {
      return;
    }
    setResult("Wrong");
    setTimeout(() => stopTest(), 5000);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setTimeout(() => nextRound(), 11000);
    }

    return () => clearTimeout(timer);
  }, [round, isRunning, nextRound, result]);

  return (
    <div className={styles.container}>
      {!isRunning && (
        <button onClick={startTest} className={styles.startButton}>
          Start Test
        </button>
      )}
      {isRunning && (
        <button onClick={stopTest} className={styles.stopButton}>
          Stop Test
        </button>
      )}

      <div className={styles.test_wrapper}>
        {isRunning && <h2>Round: {round}</h2>}
        <div ref={testRef} className={styles.shapesContainer}>
          {isRunning && (
            <>
              {shapes.map((circle, i) => {
                return (
                  <div
                    className={styles.circle}
                    style={{
                      background: circle.color,
                      position: "absolute",
                      top: circle.y,
                      left: circle.x,
                      width: circle.radius,
                      height: circle.radius,
                    }}
                    onClick={() => checkAnswer(i, circle)}
                    key={i}
                  ></div>
                );
              })}
            </>
          )}
        </div>
        {result && <div className={styles.result}>{result}</div>}
      </div>
    </div>
  );
};

export default IncreasingComplexity;
