import { FunctionComponent, useEffect, useState } from "react";
import s from "./style.module.css";
import { ButtonDefault } from "@/components/shared/UI/Buttons.tsx/buttons";
import { random } from "@/components/shared/utils/random";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import useIntervalCallback from "@/components/shared/utils/useUintervalCallback";

const infoTest = [
  {
    color: "green",
    direction: -90,
  },
  {
    color: "black",
    direction: 0,
  },
  {
    color: "violet",
    direction: 180,
  },
  {
    color: "orange",
    direction: 90,
  },
];

const TestMemory: FunctionComponent = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [squares, setSquares] = useState<
    {
      color: string;
      direction: number;
    }[]
  >([]);
  let level = 1;

  const changeArray = (level: number) => {
    let array: typeof squares = [];
    for (let i = 0; i < level + 2; i++) {
      array.push(infoTest[random(0, infoTest.length - 1)]);
    }
    level++;
    setSquares(array);
  };

  const handleStart = () => {
    changeArray(level);
    setIsStart(!isStart);
  };
  useIntervalCallback(() => changeArray(level), 10, isStart);
  useEffect(() => {
    const testTimer = setTimeout(() => {
      setIsStart(false);
    }, 30000);

    if (!isStart) {
      clearTimeout(testTimer);
    }

    return () => {
      clearTimeout(testTimer);
    };
  }, [isStart]);

  return (
    <>
      <main className={s.main}>
        <h1 style={{ textAlign: "center" }}>Скорость принятия решений</h1>
        <div className={s["test-wrapper"]}>
          {isStart ? (
            <div className={s["test-container"]}>
              {squares.map((square, i) => {
                return (
                  <div
                    key={i}
                    style={{ background: square.color }}
                    className={s.square}
                  ></div>
                );
              })}
            </div>
          ) : (
            <div className={s["test-wrapper__info"]}>
              {infoTest.map((item, index) => (
                <div key={index} className={s["test-item"]}>
                  <div
                    className={s.square}
                    style={{ background: item.color }}
                  ></div>
                  <ArrowIcon degrees={item.direction} />
                </div>
              ))}
            </div>
          )}
        </div>
        <ButtonDefault
          disabled={isStart ? true : false}
          handlClick={handleStart}
        >
          {isStart ? "Stop" : "Start"}
        </ButtonDefault>
      </main>
    </>
  );
};

export default TestMemory;
