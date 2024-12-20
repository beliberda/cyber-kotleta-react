import { FunctionComponent, useEffect, useState } from "react";
import s from "./style.module.css";
import { ButtonDefault } from "@/components/shared/UI/Buttons.tsx/buttons";
import Labirinth from "@/components/pages/Tests/TestLabirinth/labirinth";
import useCountdownTimer from "@/components/shared/utils/useCountdownTimer";

const TestLabirinth: FunctionComponent = () => {
  const [isStart, setIsStart] = useState<boolean>(false);

  const handleStop = () => {
    setIsStart(false);
  };

  const { timeLeft, start } = useCountdownTimer(10000, () => handleStop);
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return `${seconds}s ${milliseconds}ms`;
  };
  const handleStart = () => {
    setIsStart(true);
    // start();
  };
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
              <Labirinth />
              <div className="timer">{formatTime(timeLeft)}</div>
            </div>
          ) : (
            <div className={s["test-wrapper__info"]}></div>
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

export default TestLabirinth;
