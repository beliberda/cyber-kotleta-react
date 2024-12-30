import { useEffect, useRef, useState } from "react";

import { random } from "@/components/shared/utils/random";
import s from "./style.module.css";
import {
  ButtonDefault,
  ButtonIcon,
} from "@/components/shared/UI/Buttons.tsx/buttons";
import useTimer from "@/components/shared/utils/useTimer";
import resetIcon from "@assets/icons/resetTime.svg";

function Test3() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trainNum, setTrainNum] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [timeLevel, setTimeLevel] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const { milliseconds, seconds, reset, stop, zero } = useTimer(isStart);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartChange = () => {
    stop();
    setIsStart((prevStart) => !prevStart);
  };

  useEffect(() => {
    if (isStart) {
      zero();
      const updateTimer = () => {
        if (containerRef.current) {
          const randomX = random(100, containerRef.current.clientWidth - 100);
          const randomY = random(100, containerRef.current.clientHeight - 100);
          setTrainNum(random(0, 10));
          setPosition({ x: randomX, y: randomY });
          setCount((prevCount) => {
            if (prevCount >= timeLevel * 5) {
              setTimeLevel((prevTimeLevel) => prevTimeLevel + 1);
              return 0;
            }
            return prevCount + 1;
          });
        }
        timerRef.current = setTimeout(updateTimer, 1000 - timeLevel * 100);
      };

      updateTimer();
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setTimeLevel(0);
      setCount(0);
      stop();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isStart, timeLevel]);

  return (
    <>
      <main ref={containerRef} className={s["main"] + " container"}>
        <h1 style={{ textAlign: "center" }}>Саккады</h1>
        <div
          style={{
            display: isStart ? "flex" : "none",
            top: position.y,
            left: position.x,
          }}
          className={s["circle"]}
        >
          {trainNum}
        </div>
        <div className={s["button-wrapper"]}>
          <ButtonDefault handlClick={handleStartChange}>
            {isStart ? "Stop test" : "Start test"}
          </ButtonDefault>
          <ButtonIcon
            handlClick={() => {
              reset();
            }}
            icon={resetIcon}
          />
        </div>

        <div className={s["timer"]}>
          {seconds}:{milliseconds} сек
        </div>
      </main>
    </>
  );
}

export default Test3;
