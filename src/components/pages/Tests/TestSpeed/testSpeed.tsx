import { FunctionComponent, useEffect, useState } from "react";
import s from "./style.module.css";
import { ButtonDefault } from "@/components/shared/UI/Buttons.tsx/buttons";
import { random, randomArray } from "@/components/shared/utils/random";
import useIntervalCallback from "@/components/shared/utils/useUintervalCallback";

const infoTest = [
  {
    title: "Зеленый",
    color: "green",
    action: "2 шага влево",
  },
  {
    title: "Красный",
    color: "red",
    action: "2 шага вправо",
  },
  {
    title: "Синий",
    color: "blue",
    action: "2 шага назад",
  },
  {
    title: "Ничья",
    color: "black",
    action: "Стой на месте",
  },
];

const testColumns = [
  {
    color: "green",
    numbers: randomArray(1, 10, 3),
  },
  {
    color: "red",
    numbers: randomArray(1, 10, 3),
  },
  {
    color: "blue",
    numbers: randomArray(1, 10, 3),
  },
];

const TestSpeed: FunctionComponent = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [columnsArray, setColumnsArray] = useState(testColumns);
  const handleStart = () => {
    setIsStart(!isStart);
  };

  const changeColumns = () => {
    const newColumns = columnsArray.map((column) => {
      return {
        ...column,
        numbers: randomArray(1, 10, 3),
      };
    });
    setColumnsArray(newColumns);
  };

  useIntervalCallback(() => changeColumns(), 10, isStart);

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
              {columnsArray.map((column) => {
                return (
                  <div
                    key={column.color}
                    style={{ background: column.color }}
                    className={s["test-column"]}
                  >
                    {column.numbers.array.map((number, i) => {
                      return <p key={i}>{number}</p>;
                    })}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={s["test-wrapper__info"]}>
              <h2>Кто победит?</h2>
              {infoTest.map((item, index) => (
                <div key={index} className={s["test-item"]}>
                  <p style={{ color: item.color }}>{item.title}</p>
                  <p>-</p>
                  <p>{item.action}</p>
                </div>
              ))}
              <h2>Приготовься!</h2>
            </div>
          )}
        </div>
        <ButtonDefault handlClick={handleStart}>Начать</ButtonDefault>
      </main>
    </>
  );
};

export default TestSpeed;
