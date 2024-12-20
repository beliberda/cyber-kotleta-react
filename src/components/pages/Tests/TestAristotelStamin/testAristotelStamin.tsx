import { Fragment, FunctionComponent, useEffect, useState } from "react";
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

const TestAristotelStamin: FunctionComponent = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [level, setLevel] = useState(1);
  const [squares, setSquares] = useState<
    {
      color: string;
      direction: number;
    }[]
  >([]);

  const changeArray = (level: number) => {
    let array: typeof squares = [];
    for (let i = 0; i < level + 2; i++) {
      array.push(infoTest[random(0, infoTest.length - 1)]);
    }
    if (level < 7) {
      setLevel(level + 1);
    }
    setSquares(array);
  };
  const handleStart = () => {
    changeArray(level);
    setIsStart(true);
  };
  useIntervalCallback(
    () => {
      console.log("Work");

      changeArray(level);
    },
    7,
    isStart
  );
  useEffect(() => {
    setInterval;
    const testTimer = setTimeout(() => {
      setIsStart(false);
    }, 35000);
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
                if (i === random(0, squares.length - 1))
                  return (
                    <Fragment key={i}>
                      <ArrowIcon degrees={square.direction} />
                    </Fragment>
                  );
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

        <ButtonDefault handlClick={handleStart}>
          {isStart ? "Stop" : "Start"}
        </ButtonDefault>
      </main>
    </>
  );
};

export default TestAristotelStamin;
