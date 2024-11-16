import { useEffect, useRef, useState } from "react";

import ButtonDefault from "@/components/shared/UI/Buttons.tsx/buttons";
import { random } from "@/components/shared/utils/random";
import s from "./style.module.css";
import timeFormat from "@/components/shared/utils/timeFormat";

class dynamicTimer {
  triggerTime = 0;
  callback = () => {};
  timer: any;
  constructor(func: () => void, delay: number) {
    this.callback = func;
    this.triggerTime = +new Date() + delay;
    this.timer = 0;
    this.updateTimer();
  }

  updateTimer() {
    clearTimeout(this.timer);
    let delay = this.triggerTime - Number(new Date());
    console.log("Current delay: ", delay);
    this.timer = setTimeout(this.callback, delay);
    return this;
  }

  addTime(delay: number) {
    this.triggerTime -= delay;
    this.updateTimer();
    return this;
  }
}

function Test3() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trainNum, setTrainNum] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [timeLevel, setTimeLevel] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [timerCurrent, setTimerCurrent] = useState("00:00:00");

  const handleStartChange = () => {
    setStart((prevStart) => !prevStart);
  };

  useEffect(() => {
    const finalTimer = setInterval(() => {
      let ms = 0;
      setTimerCurrent(timeFormat(ms));
    }, 1);
    if (start) {
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
    }
    if (!start) {
      clearInterval(finalTimer);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        clearInterval(finalTimer);
      }
    };
  }, [start, timeLevel]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Саккады</h1>
      <main ref={containerRef} className={s["main"] + " container"}>
        <div
          style={{
            display: start ? "flex" : "none",
            top: position.y,
            left: position.x,
          }}
          className={s["circle"]}
        >
          {trainNum}
        </div>
        <ButtonDefault handlClick={handleStartChange}>
          {start ? "Stop test" : "Start test"}
        </ButtonDefault>
        {/* <div className={s["timer"]}>{timerCurrent}</div> */}
      </main>
    </>
  );
}

export default Test3;
